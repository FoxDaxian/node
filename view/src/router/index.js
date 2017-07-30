import Vue from 'vue'
import VueRouter from 'vue-router'

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
});

export default routers
