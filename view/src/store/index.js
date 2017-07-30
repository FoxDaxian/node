import Vue from 'vue'
import Vuex from 'vuex'
import config from './config.js'

Vue.use(Vuex)

const store = new Vuex.Store(config)

export { store }