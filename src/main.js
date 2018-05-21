// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import env from './env'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

import axios from 'axios'

const token = localStorage.getItem('user-token')

if (token) {
    axios.defaults.headers.common['Authorization'] = 'bearer ' + token
}

axios.defaults.baseURL = env.API_URL;
axios.defaults.headers.common = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
window.axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});