import Vue from 'vue'
import VueRouter from 'vue-router'
const Nav = resolve => require(['@/component/content/component/nav/nav'], resolve);
const SideBar = resolve => require(['@/component/content/component/sidebar/sidebar'], resolve);
const Crumbs = resolve => require(['@/component/content/component/crumbs/crumbs'], resolve);
const Article = resolve => require(['@/component/content/component/article/article'], resolve);

Vue.use(VueRouter)



const routers = new VueRouter({
	mode:"history",
	routes : [{
		path:"/",
		name:"home",
		components:{
			crumbs:Crumbs,
			nav:Nav,
			article:Article,
			sidebar:SideBar
		}
	}]
});

export default routers;