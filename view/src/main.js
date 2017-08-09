// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from "vue-resource"
import miniprogress from 'miniprogress'
import 'miniprogress/lib/progress.css'

import './assets/reset.css'
import router from "@/router/" //大写会报错= = 

import { store } from './store/'
import storeTool from './tools/store.tool'


Vue.use(storeTool)
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
	request.credentials = true
	next()
})

Vue.prototype.progress = miniprogress

if (process.env.NODE_ENV === 'development') {
	Vue.prototype.url = 'http://localhost:3000/api/'
	Vue.prototype.testUrl = 'http://localhost:3000/api/qiniu'
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
	router: router(Vue.http, miniprogress, Vue.prototype.url),
	store
})
