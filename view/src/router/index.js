import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/'

const Nav = resolve => require(['@/component/content/component/nav/nav'], resolve)
const SideBar = resolve => require(['@/component/content/component/sidebar/sidebar'], resolve)
const Article = resolve => require(['@/component/content/component/article/article'], resolve)
const accountHome = resolve => require(['@/views/accountPage/accountHome/'], resolve)
const register = resolve => require(['@/views/accountPage/register/'], resolve)
const login = resolve => require(['@/views/accountPage/login/'], resolve)

Vue.use(VueRouter)

const routers = new VueRouter({
	mode: "history",
	routes: [{
		path: "/",
		name: "home",
		components: {
			nav: Nav,				//左侧导航
			article: Article,		//中间主题内容
			sidebar: SideBar 		//右边其他内容
		}
	}, {
		path: "/account",
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
	}]
})

const fn =  async () => {
	try {
		// this.progress.start()
		const res = await this.$http({
			method: 'get',
			url: `${this.url}authentication`
		})
		console.log(res)
		console.log(JSON.stringify(res, null, 4))
		// this.progress.done()
	} catch (err) {
		console.log(err)
		// this.progress.done('fail')
	}
}

routers.beforeEach((to, from, next) => {
	fn()
	console.log(store.state)
	next()
})

export default routers
