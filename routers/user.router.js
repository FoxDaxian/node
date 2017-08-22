const express = require('express')
const request = require('request')
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const { User } = require('../model/')


const jwt = require('jsonwebtoken')//设置和验证token的
const expressJWT = require('express-jwt')// 验证token的 继续撸文档 #https://github.com/auth0/express-jwt
const secretOrPrivateKey = "fox" 

router.get('/setjwt', function(req,res) {
    var token = jwt.sign({username: 'fox', age: 23}, secretOrPrivateKey) //生成一个jwt并发送给客户端
    return res.status(200).json(token);
});

router.post('/testPost', expressJWT({
	secret: secretOrPrivateKey,
	credentialsRequired: false,
	getToken: function fromHeaderOrQuerystring (req) {
		return req.body.token;
	}
}), (req, res, next) => {	
	res.json({
		msg: req.user
	})

})



// 验证身份，即有无session
router.get('/authentication', (req, res, next) => {
	if (typeof req.session.token !== 'undefined') {
		delete req.session.token.password
		return res.json({
			token: req.session.token
		})
	} else {
		return res.json({
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
			res.status(403)
			return res.json({
				status: 0,
				msg: '注册失败'
			})
		}
		req.session.token = instance
		res.json({
			status: 1,
			res: instance,
			msg: '注册成功'
		})
	})
})

router.get('/signout', (req, res, next) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(403)
			return res.json({
				status: 0,
				msg: '退出失败'
			})
		}
		res.status(200)
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
			res.status(403)
			return res.json({
				status: 0,
				res: '',
				msg: '请求出错'
			})
		}
		if (docs !== null) {
			res.status(200)
			req.session.token = docs
			return res.json({
				status: 1,
				res: docs,
				msg: '登录成功'
			})
		} else {
			res.status(403)
			return res.json({
				status: 2,
				res: {},
				msg: '账号不存在'
			})
		}
	})
})

// router.get('/proxy', (req, res, next) => {
// 	res.json({
// 		msg: '代理'
// 	})
// })

// router.get('/test', (req, res, next) => {
// 	request('http://localhost:3000/api/proxy', function (error, response, body) {
//         res.json({
//         	a: response,
//         	b: body
//         })
//     })
// })

module.exports = router