import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)

const state={
	isLogin:false,
	users:{},
	isLogin1:false,
	users1:{},
	cartdata:[],
	cartnum:0,
}

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})

