import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)
const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return RouterPush.call(this, to).catch(err => err)
}
const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
    return RouterReplace.call(this, to).catch(err => err)
}
/*
import Home from '@/pages/Home/hm-index.vue'
import Login from '@/pages/Login/lg-index.vue'
import Register from '@/pages/Register/rg-index.vue'
import Search from '@/pages/Search/sc-index.vue'
import Detail from '@/pages/Detail/de-index.vue'
import AddCar from '@/pages/addShopCart/ac-index.vue'
import CartList from '@/pages/shopCart/sc-index.vue'
import Trade from '@/pages/Trade/tc-index.vue'
import Pay from '@/pages/Pay/pay-index.vue'
import PaySuccess from '@/pages/PaySuccess/ps-index.vue'
*/
let router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/pages/Home/hm-index.vue'),
            meta: {
                footerShow: true,

            }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/Login/lg-index.vue'),
            meta: {
                footerShow: false,

            }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/pages/Register/rg-index.vue'),
            meta: {
                footerShow: false,
            }
        },
        {
            path: '/search/:keyword',
            name: 'Search',
            component: () => import('@/pages/Search/sc-index.vue'),
            meta: {
                footerShow: true,
            }
        },
        {
            path: '/detail/:skuid',
            name: 'Detail',
            component: () => import('@/pages/Detail/de-index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/addcar/:skuNum',
            name: 'AddShopCar',
            component: () => import('@/pages/addShopCart/ac-index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/cartList',
            name: 'CartList',
            component: () => import('@/pages/shopCart/sc-index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/trade',
            name: 'Trade',
            component: () => import('@/pages/Trade/tc-index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/pay',
            name: 'Pay',
            component: () => import('@/pages/Pay/pay-index.vue'),
            meta: {
                footerShow: true
            }
        },
        {
            path: '/paysuccess',
            name: 'paySuccess',
            component: () => import('@/pages/PaySuccess/ps-index.vue'),
            meta: {
                footerShow: true
            }
        }
    ]
});

router.beforeEach(async(to, from, next) => {
    // to and from are both route objects. must call `next`.
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token || localStorage.getItem('Token');
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == "/register") {
            next("/home");
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    //获取用户信息
                    await store.dispatch("user/getUserInfo");
                    next();
                } catch (error) {
                    //token失效从新登录
                    //清除token
                    await store.dispatch("logout");
                    // 回到登录页
                    this.$router.push("/login");
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.includes("/trade") || toPath.includes("/pay") || toPath.includes("/center")) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next("/login?redirect=" + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }
    }
});
export default router