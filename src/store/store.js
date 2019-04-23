import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { fetchData } from '../api';
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
            getProduct: state =>{
                return state.product;
            },
            getMslider: state =>{
                return state.mslider;
            }
        },
        actions: {
            setFetchedProducts ({commit}) {
                fetchData().then(response =>{
                    return response.json();
                }, error =>{
                    console.log(error);
                }).then(data => {  
					const productArray = [];
					for(let key in data.products){
						productArray.push(data.products[key]);
                    }
                    commit('SET_PRODUCTS', productArray);
                }); 
            },
            setProductById ({commit}, id) {
                fetchData().then(response =>{
                    return response.json();
                }, error =>{
                    console.log(error);
                }).then(data => {  
					const productArray = [];
					for(let key in data.products){
						productArray.push(data.products[key]);
                    }
                    const productObj = productArray.filter(item => item.productId === id)[0];
                    commit('SET_PRODUCT', productObj);
                });
            },
            setFetchedMslider({commit}) {
                fetchData().then(response =>{
                    return response.json();
                }, error =>{
                    console.log(error);
                }).then(data => {
					const mSliderArray = [];
					for(let key in data.mslider){
						mSliderArray.push(data.mslider[key]);
                    }
                    commit('SET_MSLIDER', mSliderArray);
                });
            }
        },
        mutations: {
            'SET_PRODUCTS': (state, data) =>{
                state.products = data;
            },
            'SET_PRODUCT': (state, data) =>{
                state.product = data;
            },
            'SET_MSLIDER': (state, data) =>{
                state.mslider = data;
            }
        }
    });
}