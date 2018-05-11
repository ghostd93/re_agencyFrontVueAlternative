import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementList from '@/components/AdvertisementList'
import Advertisement from '@/components/Advertisement'
import Account from '@/components/Account'
import Login from '@/components/Login'
import store from '../store'

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next()
        return
    }
    next('/')
}

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/');
}

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'AdvertisementList',
            component: AdvertisementList
        },
        {
            path: '/advertisement/:id',
            name: 'Advertisement',
            component: Advertisement
        },
        {
            path: '/account',
            name: 'Account',
            component: Account,
            beforeEnter: ifAuthenticated
        }
    ]
})
