import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/'

const App = resolve => require(['@/views/'], resolve)
const Nav = resolve => require(['@/component/content/component/nav/nav'], resolve)
const SideBar = resolve => require(['@/component/content/component/sidebar/sidebar'], resolve)
const Article = resolve => require(['@/component/content/component/article/article'], resolve)
const accountHome = resolve => require(['@/views/accountPage/accountHome/'], resolve)
const register = resolve => require(['@/views/accountPage/register/'], resolve)
const login = resolve => require(['@/views/accountPage/login/'], resolve)

Vue.use(VueRouter)

const authentication = async (http, progress, url) =>  {
	try {
		progress.start()
		const res = await http({
			method: 'get',
			url: `${ url }authentication`
		})
		progress.done()
		if (res.data.token) {
			store.commit('serUserInfo', res.data.token)
			return Promise.resolve(true)
		} else {
			store.commit('serUserInfo', {})
			return Promise.resolve(false)
		}
	} catch (err) {
		progress.done('fail')
		console.log(err)
	}
}

const foo = (http, progress, url) => {
	const routers = new VueRouter({
		mode: "history",
		routes: [{
			path: '/',
			component: App,
			children:[{
				path: "/",
				name: "home",
				components: {
					nav: Nav,				//左侧导航
					article: Article,		//中间主题内容
					sidebar: SideBar 		//右边其他内容
				}
			}, {
				path: "account",
				name: "account",
				component: accountHome,
				children: [{
					path: "register",
					name: 'register',
					component: register
				}, {
					path: "login",
					name: 'login',
					component: login
				}]
			}],
			beforeEnter: async (to, from, next) => {
				if (Object.keys(store.state.userInfo).length) {
					return next()
				}
				if (await authentication(http, progress, url)) {
					if (/\/account.*/.test(to.path)) {
						return next({
							name: 'home'
						})
					}
					next()
				} else {
					next()
				}
			}
		}]
	})
	return routers
}

export default foo
