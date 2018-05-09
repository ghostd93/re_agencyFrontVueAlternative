import Vue from 'vue'
import Vuex from 'vuex'
import advertisements from './modules/advertisements'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    advertisements
  }
})