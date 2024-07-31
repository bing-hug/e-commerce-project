import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

import {reqCategoryList, reqBanner, reqFloor, reqSearchList, reqGoodInfo, reqAddShopCar, reqCartList, reqDelCartGood, reqUpdateCheckedByid, reqGetCode, reqUserInfo, reqlogout, reqUserLogin, reqUserRegister, reqTrade, reqSubmitOrder, reqPay, reqPayStatus} from "@/api";

import { getUUID } from "@/utils/uuid_token";
import {getToken, setToken, removeToken} from "@/utils/token";

const home = {
    namespaced: true,
    state: {
        count: 1,
        categoryList: [],
        bannerList: [],
        floorList: [],
    },
    mutations: {
        CATEGORYLIST(state, categoryList){
            state.categoryList = categoryList
        },
        GETBANNERLIST(state, bannerData){
            state.bannerList = bannerData
        },
        GETFLOORLIST(state, floorData){
            state.floorList = floorData
        }

    },
    actions: {
        async getCategoryList({commit}){
             let cateList = await reqCategoryList();
            commit('CATEGORYLIST', cateList.data);
        },
        async getBannerList({commit}){
            let bannerData = await reqBanner();
            if(bannerData.code == 200){
                commit('GETBANNERLIST', bannerData.data);
            }
        },
        async getFloorList({commit}){
            let floorData = await reqFloor();
            if(floorData.code == 200){
                commit('GETFLOORLIST', floorData.data);
            }
        }
    },
    getters: {}
}

const search = {
    namespaced: true,
    state: {
        count: 2,
        searchData: {},
        total: ''
    },
    mutations: {
        GETSEARCHLIST(state, searchData){
            state.searchData = searchData.data;
            state.total = searchData.data.total;
        }
    },
    actions: {
        async getSearchList({ commit }, params){
            let searchData = await reqSearchList(params);
            commit("GETSEARCHLIST", searchData);
        }
    },
    getters: {
        goodsList(state){
            return state.searchData.goodsList || []
        },
        trademarkList(state){
            return state.searchData.trademarkList || []
        },
        attrsList(state){
            return state.searchData.attrsList || []
        }
    }
}

const detail = {
    namespaced: true,
    state: {
        goodInfo: {},
        uuidToken: getUUID()
    },
    mutations: {
        GETGOODINFO(state, goodData){
            state.goodInfo =goodData.data;
        },
    },
    actions: {
        async getGoodInfo({ commit }, params){
            let  goodData = await reqGoodInfo(params);
            commit("GETGOODINFO", goodData);
        },
        async addShopCar({commit}, {skuId, skuNum}){
            console.log(commit);
          let res = await reqAddShopCar({skuId, skuNum});
            if(res.code == 200){
                return "ok"
            }else{
                return Promise.reject(new Error("faile"));
            }
        }
    },
    getters: {
        categoryView(state){
            return state.goodInfo.categoryView || []
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || []
        },
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList
        },
        valuesSkuJson(state){
            return state.goodInfo.valuesSkuJson
        }

    }
}

const cartList = {
    namespaced: true,
    state: {
        cartInfoList: []
    },
    mutations: {
        GETCARTLIST(state, cartData){
            if(cartData.data.length > 0){
                state.cartInfoList = cartData.data[0].cartInfoList;
            }else{
                state.cartInfoList = [];
            }
        },
    },
    actions: {
        async getCartList({ commit }){
            let  cartData = await reqCartList();
            commit("GETCARTLIST", cartData);
        },
        async delCartGood({commit}, skuId){
            console.log(commit);
            let res = await reqDelCartGood(skuId);
            if(res.code == 200){
                return 'ok'
            }else{
                return Promise.reject(new Error("faile"));
            }
        },
        //修改购物车某一个产品的选中状态
        async updateCheckedById({ commit }, { skuId, isChecked }) {
            console.log(commit);
            let result = await reqUpdateCheckedByid(skuId, isChecked);
            if (result.code == 200) {
                return "ok";
            } else {
                return Promise.reject(new Error("faile"));
            }
        },
        deleteAllCheckedCart({ dispatch, state }) {
            let PromiseAll = [];
            state.cartInfoList.forEach((item) => {
                let Promise = item.isChecked == 1 ? dispatch("delCartGood", item.skuId) : "";
                //将每一次返回的Promise添加到数组当中
                PromiseAll.push(Promise);
            });
            return Promise.all(PromiseAll);
        },
        updateAllCartChecked({ dispatch, state }, isChecked) {
            //数组
            let promiseAll = [];
            state.cartInfoList.forEach((item) => {
                let promise = dispatch("updateCheckedById", {
                    skuId: item.skuId,
                    isChecked,
                });
                promiseAll.push(promise);
            });
            //最终返回结果
            return Promise.all(promiseAll);
        },
    },
    getters: {

    }
}

const user = {
    namespaced: true,
    state: {
        code: '',
        token: getToken(),
        userInfo: {},
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code;
        },
        USERLOGIN(state, token) {
            state.token = token;
        },
        USERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        CLEAR(state) {
            //帮仓库中先关用户信息清空
            state.userInfo = {};
            state.token = '';
            //本地存储数据清空
            removeToken();
        },
    },
    actions: {
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone);
            if (result.code == 200) {
                commit('GETCODE', result.data);
            }
        },
        //注册
        async userRegister({ commit }, user) {
            console.log(commit)
            let result = await reqUserRegister(user);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        //登录业务
        async reqUserLogin({ commit }, user) {
            let result = await reqUserLogin(user);
            //服务器下发token，用户唯一标识符(uuid)
            //将来经常通过带token找服务器要用户信息进行展示
            if (result.code === 200) {
                commit('USERLOGIN', result.data.token);
                setToken(result.data.token); //持久化存储token
            }
        },
        //获取用户信息在首页展示【需要带着用户的token向服务器要用户信息】
        async getUserInfo({ commit }) {
            let result = await reqUserInfo();
            if (result.code == 200) {
                commit('USERINFO', result.data);
                return 'ok';
            } else {
                return new Error('faile');
            }
        },
        // 退出登录
        async logout({ commit }) {
            console.log(commit);
            let result = await reqlogout();
            //action里面不能操作state，提交mutation修改state
            if (result.code == 200) {
                commit('CLEAR', result.data);
            } else {
                return Promise.reject(new Error('falie'));
            }
        },
    },
    getters: {
        userName(state){
            return state.userInfo.name || ''
        }
    }
}

const trade = {
    namespaced: true,
    state: {
        tradeList: {}
    },
    actions: {
        async getTraceList({commit}){
            let tradeData = await reqTrade();
            commit('GETTRACELIST', tradeData);
        },
        async submitOrder({commit}, params){
            console.log(commit);
          let res = await reqSubmitOrder(params);
          if(res.code == 200){
              return res
          }else{
              return Promise.reject(new Error('faile'));
          }
        }
    },
    mutations: {
        GETTRACELIST(state, tradeData){
            state.tradeList = tradeData.data || []
        }
    },
    getters: {
        detailArrayList(state){
            return state.tradeList.detailArrayList || []
        },
        totalNum(state){
            return state.tradeList.totalNum || 0
        },
        totalAmount(state){
            return state.tradeList.totalAmount || 0
        },
        userAddressList(state){
            return state.tradeList.userAddressList || []
        },
        tradeNo(state){
            return state.tradeList.tradeNo
        }
    }
}
const pay = {
    namespaced: true,
    state: {
        payInfo: {}
    },
    actions: {
        async getPayInfo({commit}, orderId){
            let payData = await reqPay(orderId);
            commit('GETPAYINFO', payData);
        },
        async getPayStatus({commit}, orderId){
            console.log(commit);
            let status = await reqPayStatus(orderId);
            return status
        }
    },
    mutations: {
        GETPAYINFO(state, payData){
            state.payInfo = payData.data;
        }
    }
}

export default new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        cartList,
        user,
        trade,
        pay
    }
})
