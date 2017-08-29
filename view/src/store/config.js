const config = {
	strict: process.env.NODE_ENV !== 'production',
	state: {
		panelStatus: false,
		userInfo: '' // 类型应该是对象，但是为了不闪烁，所以默认设置成了空字符串
	},
	mutations: {
		// 切换用户个人面板
		togglePanel (state) {
			state.panelStatus = !state.panelStatus
		},
		// 登录用户信息
		serUserInfo (state, data) {
			state.userInfo = Object.assign({}, data)
		},
	}
}

export { config as default }
