const express = require('express')
const rp = require('request-promise') // 带promise的request -> 支持async
const jwt = require('jsonwebtoken') // 设置和验证token的
const expressJWT = require('express-jwt') // 验证token的 继续撸文档 #https://github.com/auth0/express-jwt
const config = require('../config/index.js')

const devConf = process.env.NODE_ENV === 'development' ? config.dev : config.prod
const router = express.Router({
	caseSensitive: false //默认不区分大小写
})
const { User } = require('../model/')

// jwt
//// ----------------------分割线----------------------
const secretOrPrivateKey = devConf.jwtSecret
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

router.get('/signByGithub', async (req, res, next) => {
	try {
		const access_token_data = await rp({
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
				code: req.query.code
			}
		})
		const result = await rp({
			url: `https://api.github.com/user?access_token=${ access_token_data.access_token }`,
			method: 'GET',
			headers: {
				'User-Agent': 'a13821190779'
			}
		})

		const findRes = await User.findOne({
			account: JSON.parse(result).login
		})

		if (findRes !== null) {
			req.session.token = findRes
		} else {
			const user = new User({
				username: JSON.parse(result).name,
				account: JSON.parse(result).login,
				password: '123456',
				email: JSON.parse(result).email,
				avator: JSON.parse(result).avatar_url
			})
			const saveRes = await user.save()
			req.session.token = saveRes
		}
		return res.status(302).redirect(`${ devConf.githubBackUrl }`)
	} catch (err) {
		console.log(err)
		return res.status(401).json('授权失败, 请返回并重试')
	}
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
router.post('/register', async (req, res, next) => {
	try {
		const body = req.body
		const user = new User({
			account: body.account,
			password: body.password,
			email: body.email
		})
		const saveRes = await user.save()
		req.session.token = saveRes
		res.json({
			status: 1,
			res: saveRes,
			msg: '注册成功'
		})
	} catch (err) {
		console.log(err)
		return res.json({
			status: 0,
			msg: '注册失败'
		})
	}
})

router.post('/signin', async (req, res, next) => {
	try {
		const body = req.body
		const findRes = await User.findOne({
			account: body.account,
			password: body.password
		})
		if (findRes !== null) {
			res.status(200)
			req.session.token = findRes
			return res.json({
				status: 1,
				res: findRes,
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
	} catch (err) {
		console.log(err)
		res.status(403)
		return res.json({
			status: 0,
			res: '',
			msg: '请求出错'
		})
	}
})

router.get('/signout', async (req, res, next) => {
	try {
		const destroyRes = await req.session.destroy()
		res.status(200).json({
			status: 1,
			msg: '退出成功'
		})
	} catch (err) {
		console.log(err)
		res.status(403)
		return res.json({
			status: 0,
			msg: '退出失败'
		})
	}
})

module.exports = router