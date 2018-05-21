import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementList from '@/components/AdvertisementList'
import Advertisement from '@/components/Advertisement'
import Account from '@/components/Account'
import store from '../store'
import Users from '@/components/admin/Users'
import Advertisements from '@/components/admin/Advertisements'
import axios from 'axios'

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

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        store.dispatch('logout')
    }
    return error;
});

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
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        },
        {
            path: '/advertisements',
            name: 'Advertisements',
            component: Advertisements
        },
    ]
})
