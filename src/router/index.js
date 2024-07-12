import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
    return RouterReplace.call(this, to).catch(err => err)
}
import Home from '@/pages/Home/hm-index.vue'
import Login from '@/pages/Login/lg-index.vue'
import Register from '@/pages/Register/rg-index.vue'
import Search from '@/pages/Search/sc-index.vue'
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                footerShow: true,

            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                footerShow: false,

            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            meta: {
                footerShow: false,
            }
        },
        {
            path: '/search/:keyword',
            name: 'Search',
            component: Search,
            meta: {
                footerShow: true,
            }
        },
    ]
})