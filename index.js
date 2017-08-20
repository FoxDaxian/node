// FIXME: 使用FIXME提醒自己和别人，要修复这里
// TODO: 使用TODO来提示自己，要做的东西
const express = require('express')
const app = express()
const config = require('./config/')
const commonRouter = require('./routers/common.router.js')
const bluebird = require('bluebird') // TODO 为什么要用蓝鸟的promise替换node自身的promise呢？找时间查一下
const bodyParser = require('body-parser') // 需要这个中间件来处理post请求
const cookieParser = require('cookie-parser') // 解析cookies的
const session = require('express-session') // 创建session的
const MongoStore = require('connect-mongo')(session) // session存储的地方，express-session默认存储在内存里，但是切换进程丢失
const log4js = require('log4js')
const ip = require('ip')// refer: #https://github.com/indutny/node-ip
const util = require('./util/')
// TODO admin界面，进行管理，建立admin的专属表

util.mkdir('log')

log4js.configure(config.log4js)
const logger = log4js.getLogger()
console.log = logger.info.bind(logger)

global.Promise = bluebird

//连接数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // mongoose的Promise被弃用了...
mongoose.connect(`mongodb://${ config.host }/${ config.db }`)
const db = mongoose.connection
db.on('error', (error) => {
	console.log(`连接数据库失败：${error}`)
})
db.on('open', () => {
	console.log('连接数据库成功')
})

// 设置资源目录
app.use('/static', express.static('public'))
app.use('/log', express.static('log'))

//处理json与formData数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 解析cookise的
app.use(cookieParser())
// 配置session
app.use(session({
	// secure字段: 应用在https
	name: 'blogSession',
	resave: false,
	// 是指无论有没有session cookie，每次请求都设置个session cookie
	saveUninitialized: false,
	// 加密
	secret: '40f908a38ecdbf40984e671970bbb0a2fdbbaef48919afefa42bfa21a13f31',
	// 过期时间
	cookie: { maxAge	: 7 * 24 * 60 * 60 * 1000},
	// session的存储方式，默认存在内存中，但是会丢失，存在数据库中则不会
	store: new MongoStore({
		url: `mongodb://${ config.host }/${ config.db }`
	})
}))

// log4js中间件
const accessLog = log4js.getLogger('access')
const errorLog = log4js.getLogger('error')

// access
app.use((req, res, next) => {
	if (process.env.NODE_ENV === 'production') {
		accessLog.info(`${ ip.address() }在${ new Date().toLocaleString() }请求`)
	}
	next()
})

// use 路由
app.use('/api', commonRouter )

// 404
app.use('*', (req, res, next) => {
	res.status(404).send('404')
})

// 错误处理
app.use(function(err, req, res, next) {
	if (process.env.NODE_ENV === 'production') {
		errorLog.error(err)
	}
	console.log(err)
	return res.status(500).send('未知错误')
})

// 七牛
const qiniu = require('qiniu')
const accessKey = 'bETmnVX9dU_99S5JBxO991fHKdAi7NjabG7Rrkiz'
const secretKey = 'Pq7c-GOmjn0Rn5vg8nHIBhiN6zfgwvTjyTVvWV3R'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
app.use('/api/qiniu', (req, res, next) => {
	var config = new qiniu.conf.Config();
	config.zone = qiniu.zone.Zone_z1;
	var options = {
	  scope: 'foxxx' // 七牛空间仓库名
	}
	var putPolicy = new qiniu.rs.PutPolicy(options)
	var uploadToken = putPolicy.uploadToken(mac)

	var localFile = 'C:/Users/1/Desktop/fsy.jpg'
	var formUploader = new qiniu.form_up.FormUploader(config)
	var putExtra = new qiniu.form_up.PutExtra();
	var key='fsy.jpg';
	// 文件上传
	formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
		respBody, respInfo) {
		if (respErr) {
			throw respErr;
		}
		if (respInfo.statusCode == 200) {
			res.json({
				status: 1,
				msg: respBody
			})
		} else {
			console.log(respInfo.statusCode);
			console.log(respBody);
		}
	})
} )

// 配置文件选项，监听
app.listen(config.port)
