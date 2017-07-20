// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from "vue-resource"
import miniprogress from 'miniprogress'
import 'miniprogress/lib/progress.css'

import './assets/reset.css'
import router from "@/router/" //大写会报错= = 
console.log(miniprogress)
miniprogress.start()

Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
	router
})
