const config = {
	state: {
		userInfo: {}
	},
	mutations: {
		// 登录用户信息
		serUserInfo (state, data) {
			state.userInfo = Object.assign({}, data)
		},
	}
}

export { config as default }
