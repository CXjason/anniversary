import Vue from 'vue';
import Vuex from 'vuex';
import goods from './good.js';
import win from './win.js';
import user from "./user.js"

Vue.use(Vuex);


const store = new Vuex.Store({
	modules:{
		goods,
		win,
		user
	}
});


export default store;




