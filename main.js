import Vue from 'vue'
import App from './App'
import store from './store';
import config from './config';
import fetchHttp from './fetch/http.js';
import moment from "./lib/moment";

Vue.config.productionTip = false

Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$http = fetchHttp;
Vue.prototype.$moment = moment;

import CustomFilters from "@/common/js/filters.js";
Object.keys(CustomFilters).forEach(key => {
	Vue.filter(key,CustomFilters[key])
});

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
