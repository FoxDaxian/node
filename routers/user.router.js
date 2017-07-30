const express = require('express')
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const { User } = require('../model/')

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
		res.json({
			status: 1,
			msg: '保存成功',
			res: instance
		})
	})
})

module.exports = router