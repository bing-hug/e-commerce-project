import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

import {reqCategoryList, reqBanner, reqFloor} from "@/api";

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
        count: 2
    },
    mutations: {},
    actions: {},
    getters: {}
}

export default new Vuex.Store({
    modules: {
        search,
        home
    }
})
