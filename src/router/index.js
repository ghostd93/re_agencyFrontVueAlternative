import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementList from '@/components/AdvertisementList'
import Advertisement from '@/components/Advertisement'

Vue.use(Router);

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
        }
    ]
})
