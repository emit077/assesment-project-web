import Vue from 'vue';
import Vuex from 'vuex';


import * as snackbar from './modules/snakbar'
import * as drawer from './modules/drawer'

Vue.use(Vuex);

export const store = new Vuex.Store({

    modules: {
        snackbar,
        drawer,
    },
    state: {
        is_production: true,
        is_offline: false,
        page_loader: false,
        token: sessionStorage.getItem("token") || null,
        user_type: sessionStorage.getItem("user_type") || null,

    },
    categories: [],
    getters: {
        getUsertype: state => {
            return state.user_type;
        },
    },
    mutations: {
        SET_USER_TYPE(state, value) {
            state.user_type = value
        },
        SET_IS_OFFLINE(state, value) {
            state.is_offline = value
        },
        SET_PAGE_LOADER(state, value) {
            state.page_loader = value
        },
    },
    actions: {
        setUserType({commit}, value) {
            commit('SET_USER_TYPE', value)
        },
        setIsOffline({commit}, value) {
            commit('SET_IS_OFFLINE', value)
        },
        setPageLoader({commit}, value) {
            commit('SET_PAGE_LOADER', value)
        },
    }
});


