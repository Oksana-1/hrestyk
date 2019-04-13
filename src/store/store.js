import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export function createStore (){
    return new Vuex.Store({
        state: {
            products: [],
            product: {},
            mslider: []
        },
        getters: {
            getProducts: state =>{
                return state.products;
            },
            getMslider: state =>{
                return state.mslider;
            },
        },
        actions: {
            setFetchedProducts ({commit}, data) {
                console.log('setFetchedProducts action');
                commit('setProducts', data);
            },
            setFetchedMslider({commit}, data) {
                commit('setMslider', data);
            }
        },
        mutations: {
            setProducts: (state, data) =>{
                console.log('setProducts mutation');
                state.products = data;
            },
            setMslider: (state, data) =>{
                state.mslider = data;
            }
        }
    });
}