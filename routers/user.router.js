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

router.get('/signout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			res.json({
				status: 0,
				msg: '退出失败'
			})
			return
		}
		res.json({
			status: 1,
			msg: '退出成功'
		})
	})
})

router.post('/signin', (req, res, next) => {
	const body = req.body
	User.findOne({
		account: body.account,
		password: body.password,
	}, (err, docs) => {
		if (err) {
			res.json({
				tatus: 0,
				msg: '查询时出错'
			})
			return 
		}
		if (docs !== null) {
			req.session.token = docs
			res.json({
				tatus: 1,
				res: docs
			})
		} else {
			res.json({
				tatus: 2,
				res: '没有该账户'
			})
		}
	})
})

module.exports = router