const log4js = require('./log4js')
module.exports = {
	dev: {
		// 监听端口
		port:3000,

		// 数据库配置
		host: 'localhost:27017',
		db: 'blog',

		// log配置
		log4js: log4js,

		// jwt secret
		jwtSecret: 'fox',

		// github 返回url
		githubBackUrl: 'http://localhost:8080/'
	},
	prod: {
		// 监听端口
		port:3000,

		// 数据库配置
		host: 'localhost:27017',
		db: 'blog',

		// log配置
		log4js: log4js,

		// jwt secret
		jwtSecret: 'fox',

		// github 返回url
		githubBackUrl: 'http://ailili.site/'
	}
}
