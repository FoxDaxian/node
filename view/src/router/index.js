import Vue from 'vue'
import VueRouter from 'vue-router'
const Nav = resolve => require(['@/component/content/component/nav/nav'], resolve);
const SideBar = resolve => require(['@/component/content/component/sidebar/sidebar'], resolve);
const Article = resolve => require(['@/component/content/component/article/article'], resolve);

Vue.use(VueRouter)



const routers = new VueRouter({
	mode:"history",
	routes : [{
		path:"/",
		name:"home",
		components:{
			nav:Nav,				//左侧导航
			article:Article,		//中间主题内容
			sidebar:SideBar 		//右边其他内容
		}
	}]
});

export default routers;