import Vue from 'vue'
import Router from 'vue-router'
import AdvertisementList from '@/components/AdvertisementList'

Vue.use(Router);

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'AdvertisementList',
            component: AdvertisementList
        }
    ]
})
