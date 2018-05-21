import Vue from 'vue'
import Vuex from 'vuex'
import advertisements from './modules/advertisements'
import auth from './modules/auth'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        advertisements,
        auth,
        users
    }
})