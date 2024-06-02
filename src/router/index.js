import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/Home/hm-index.vue'
import Login from '@/pages/Login/lg-index.vue'
import Register from '@/pages/Register/rg-index.vue'
import Search from '@/pages/Search/sc-index.vue'
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/search',
            component: Search
        },


    ]
})