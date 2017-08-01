const bluebird = require('bluebird') // 为什么要用蓝鸟的promise替换node自身的promise呢？找时间查一下
const express = require('express')
const app = express()
const bodyParser = require('body-parser') // 需要这个中间件来处理post请求
const cookieParser = require('cookie-parser') // 解析cookies的
const session = require('express-session') // 创建session的
const MongoStore = require('connect-mongo')(session) // session存储的地方，express-session默认存储在内存里，但是易丢失
const config = require('./config/')
const commonRouter = require('./routers/common.router.js')

global.Promise = bluebird

//连接数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // mongoose的Promise被弃用了...
mongoose.connect('mongodb://127.0.0.1:27017/blog')
const db = mongoose.connection
db.on('error', (error) => {
	console.log(`连接数据库失败：${error}`)
})
db.on('open', () => {
	console.log('连接数据库成功')
})

app.use('/static', express.static('public'))//设置资源目录

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
		url: 'mongodb://127.0.0.1:27017/blog'
	})
}))


// use 路由
app.use( '/api', commonRouter )

// 配置文件选项，监听
app.listen(config.port)