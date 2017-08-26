const express = require('express')
const request = require('request')
const jwt = require('jsonwebtoken')//设置和验证token的
const expressJWT = require('express-jwt')// 验证token的 继续撸文档 #https://github.com/auth0/express-jwt
const config = require('../config/index.js')

const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const { User } = require('../model/')

// jwt
//// ----------------------分割线----------------------
const secretOrPrivateKey = config.jwtSecret
router.get('/setjwt', function(req,res) {
    var token = jwt.sign({username: 'fox', age: 23}, secretOrPrivateKey) //生成一个jwt并发送给客户端
    return res.status(200).json(token)
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
//// ----------------------分割线----------------------

router.post('/github', async (req, res, next) => {
	request({
	    url: 'https://github.com/login/oauth/access_token',
	    method: "POST",
	    json: true,
	    headers: {
	        "content-type": "application/json",
	        'User-Agent': 'a13821190779'
	    },
	    body: {
	    	client_id: 'b697b41af4fb82574436',
	    	client_secret: '1de913d977bd1b030f4fba5ddf700521bb3d821c',
	    	code: req.body.code
	    }
	}, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	request({
	    		url: `https://api.github.com/user?access_token=${ body.access_token }`,
	    		method: 'GET',
	    		headers: {
	    		    'User-Agent': 'a13821190779'
	    		}
	    	}, (err, resp, result) => {
	    		if (err) {
	    			return res.json({
	    				res: '错误'
	    			})
	    		}
	    		console.log(result)
	    		return res.json({
	    			resp
	    		})
	    	})
	    }
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