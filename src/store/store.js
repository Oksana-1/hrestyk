import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import { fetchData } from '../api';
import { loadOrder } from '../api';
export function createStore (){
    return new Vuex.Store({
        state: {
            products: [],
            product: {},
            mslider: [],
            pslider: [],
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
            getpSlider:  state =>{
                return state.pslider;
            },
            getTotalSumm: state =>{
                return state.totalSumm;
            },
            getCart: state =>{
                return state.cart;
            }
        },
        actions: {
            setFetchedData ({commit}) {
                fetchData().then(response =>{
                    return response.json();
                }, error =>{
                    console.log(error);
                }).then(data => {  
                    const productArray = [];
                    const mSliderArray = [];
					for(let key in data.products){
						productArray.push(data.products[key]);
                    }
                    const pSliderArr = productArray.filter((product) => product.toMainPage === true);
					for(let key in data.mslider){
						mSliderArray.push(data.mslider[key]);
                    }
                    commit('SET_MSLIDER', mSliderArray);
                    commit('SET_PSLIDER', pSliderArr);
                    commit('SET_PRODUCTS', productArray);
                    commit('SET_CART');
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
                commit('MINUS_ONE', itemId);
            },
            sendOrder({commit}, order){
                commit('SEND_ORDER', order);
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
            'SET_PSLIDER': (state, data) =>{
                state.pslider = data;
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
                const totalSumm = state.cart.reduce((total, item) => {
                    return total + item.quantity*item.productPrice
                }, 0);
                state.totalSumm = totalSumm;
                const storageStr = state.cart.reduce((string, item) => {
                    return string.concat(item.productId , ":" , item.quantity, ',')
                }, '')
                localStorage.setItem("storageCart", storageStr);
            },
            'DELETE_ITEM': (state, itemId) =>{
                const itemIndex = state.cart.findIndex(item => item.productId === itemId);
                if(itemIndex != -1){
                    state.cart.splice(itemIndex, 1);
                }
                const totalSumm = state.cart.reduce((total, item) => {return total + item.quantity*item.productPrice},0);
                state.totalSumm = totalSumm;
                const storageStr = state.cart.reduce((string, item) => {
                    return string.concat(item.productId , ":" , item.quantity, ',')
                }, '')
                localStorage.setItem("storageCart", storageStr);
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
                const storageStr = state.cart.reduce((string, item) => {
                    return string.concat(item.productId , ":" , item.quantity, ',')
                }, '')
                localStorage.setItem("storageCart", storageStr);
            },
            'MINUS_ONE': (state, itemId) =>{
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
                const storageStr = state.cart.reduce((string, item) => {
                    return string.concat(item.productId , ":" , item.quantity, ',')
                }, '')
                localStorage.setItem("storageCart", storageStr);
            },
            'SET_CART': (state) =>{
                const storageCartStr = localStorage.getItem('storageCart');
                if(storageCartStr) {
                    const storageCartArr = storageCartStr.split(',').filter((item)=> item.length > 0);
                    const cartArr = storageCartArr.map((storageItem)=>{
                        const curProduct = state.products.find(item => item.productId === storageItem.split(':')[0]);
                        return{
                            productId: storageItem.split(':')[0],
                            quantity: Number(storageItem.split(':')[1]),
                            mainImage: curProduct.mainImage,
                            productName: curProduct.productName,
                            productPrice: curProduct.productPrice
                        }
                    });
                    state.cart = cartArr;
                }
                const totalSumm = state.cart.reduce((total, item) => {
                    return total + item.quantity*item.productPrice
                }, 0);
                state.totalSumm = totalSumm;
            },
            'SEND_ORDER': (state, customerInfo) => {
                const order = {
                    cartInfo: state.cart,
                    customerInfo: customerInfo
                }
                loadOrder(order);
                localStorage.removeItem('storageCart');
            }
        }
    });
}