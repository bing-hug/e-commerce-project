import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

import {reqCategoryList, reqBanner, reqFloor, reqSearchList, reqGoodInfo} from "@/api";

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
            console.log(floorData);
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
            console.log(searchData.data);
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
        goodInfo: {}
    },
    mutations: {
        GETGOODINFO(state, goodData){
            console.log(goodData);
            state.goodInfo =goodData.data;
        }
    },
    actions: {
        async getGoodInfo({ commit }, params){
            let  goodData = await reqGoodInfo(params);
            commit("GETGOODINFO", goodData);
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
export default new Vuex.Store({
    modules: {
        search,
        home,
        detail
    }
})
