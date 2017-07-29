const bluebird = require('bluebird') // 为什么要用蓝鸟的promise替换node自身的promise呢？找时间查一下
const express = require('express')
const app = express()
const bodyParser = require('body-parser')//需要这个中间件来处理post请求
const config = require('./config/')
const commonRouter = require('./routers/common.router.js')

global.Promise = bluebird

//连接数据库
const mongoose = require('mongoose')
mongoose.Promise = global.Promise // mongoose的Promise被弃用了...
mongoose.connect('mongodb://localhost/blog')
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

// use 路由
app.use( commonRouter )

// 配置文件选项，监听
app.listen(config.port)