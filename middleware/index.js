const express = require('express')
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})

// 后端验证用户是否登陆中间件
router.use((req, res, next) => {
	if (!req.session || !req.session.token) {
		return res.status(401).json({
			msg: '用户未登录'
		})
	}
	next()
})

export default {
	router
}