import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { fetchData } from '../api';
export function createStore (){
    return new Vuex.Store({
        state: {
            products: [],
            product: {},
            mslider: [],
            cart: [],
            totalSumm: 0,
            totalQnt: 0
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
            },
            getCart: state =>{
                return state.cart;
            },
            getTotalSumm: state =>{
                return state.totalSumm;
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
            },
            addToCart({commit}, order){
                commit('ADD_TO_CARD', order);
            },
            deleteItem({commit}, itemId){
                commit('DELETE_ITEM', itemId);
            },
            addOne({commit}, itemId){
                commit('ADD_ONE', itemId);
            },
            removeOne({commit}, itemId){
                commit('REMOVE_ONE', itemId);
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
            },
            'ADD_TO_CARD': (state, {productId, quantity}) =>{
                const productIndex = state.cart.findIndex(item => item.productId === productId);
                const currentProduct = state.products.filter(product => product.productId === productId)[0];
                if(productIndex === -1){
                    const newItem = {
                        productId: productId,
                        quantity: quantity,
                        mainImage: currentProduct.mainImage,
                        productName: currentProduct.productName,
                        productPrice: currentProduct.productPrice
                    }
                    state.cart.push(newItem);
                }
                else{
                   const newItem =  {
                        productId: productId,
                        quantity: state.cart[productIndex].quantity + quantity,
                        mainImage: currentProduct.mainImage,
                        productName: currentProduct.productName,
                        productPrice: currentProduct.productPrice
                    }
                    state.cart.splice(productIndex, 1, newItem);
                }
                const totalSumm = state.cart.reduce((total, item) => {return total + item.quantity*item.productPrice},0);
                state.totalSumm = totalSumm;
            },
            'DELETE_ITEM': (state, itemId) =>{
                const itemIndex = state.cart.findIndex(item => item.productId === itemId);
                if(itemIndex != -1){
                    state.cart.splice(itemIndex, 1);
                }
                const totalSumm = state.cart.reduce((total, item) => {return total + item.quantity*item.productPrice},0);
                state.totalSumm = totalSumm;
            },
            'ADD_ONE': (state, itemId) =>{
                const itemIndex = state.cart.findIndex(item => item.productId === itemId);
              
                if(itemIndex != -1){
                    const renewedItem =  {
                        productId: itemId,
                        quantity: state.cart[itemIndex].quantity + 1,
                        mainImage: state.cart[itemIndex].mainImage,
                        productName: state.cart[itemIndex].productName,
                        productPrice: state.cart[itemIndex].productPrice
                    }
                    state.cart.splice(itemIndex, 1, renewedItem);
                }
                const totalSumm = state.cart.reduce((total, item) => {return total + item.quantity*item.productPrice},0);
                state.totalSumm = totalSumm;
            },
            'REMOVE_ONE': (state, itemId) =>{
                const itemIndex = state.cart.findIndex(item => item.productId === itemId);
                if(itemIndex != -1 && state.cart[itemIndex].quantity > 1){
                    const renewedItem =  {
                        productId: itemId,
                        quantity: state.cart[itemIndex].quantity - 1,
                        mainImage: state.cart[itemIndex].mainImage,
                        productName: state.cart[itemIndex].productName,
                        productPrice: state.cart[itemIndex].productPrice
                    }
                    state.cart.splice(itemIndex, 1, renewedItem);
                }
                const totalSumm = state.cart.reduce((total, item) => {return total + item.quantity*item.productPrice},0);
                state.totalSumm = totalSumm;
            }
        }
    });
}