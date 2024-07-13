import Vue from "vue";
import Vuex from 'vuex'
Vue.use(Vuex);

import {reqCategoryList} from "@/api";

const home = {
    namespaced: true,
    state: {
        count: 1,
        categoryList: []
    },
    mutations: {
        CATEGORYLIST(state, categoryList){
            state.categoryList = categoryList
        }
    },
    actions: {
        async getCategoryList({commit}){
             let cateList = await reqCategoryList();
            commit('CATEGORYLIST', cateList.data);
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
