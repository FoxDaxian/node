const express = require('express')
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const { User } = require('../model/')

// 验证身份，即有无session
router.get('/authentication', (req, res, next) => {
	if (typeof req.session.token !== 'undefined') {
		delete req.session.token.password
		res.json({
			token: req.session.token
		})
	} else {
		res.json({
			msg: '你是谁?'
		})
	}
})

// 注册
router.post('/register', (req, res, next) => {
	const body = req.body
	const user = new User({
		username : '',
		account: body.account,
		password: body.password,
		email: body.email
	})
	user.save((err, instance) => {
		if (err) {
			res.json({
				status: 0,
				msg: err
			})
			return
		}
		req.session.token = instance
		res.json({
			status: 1,
			msg: '保存成功',
			res: instance
		})
	})
})

module.exports = router