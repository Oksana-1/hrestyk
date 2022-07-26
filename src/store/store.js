import Vue from "vue";
import Vuex from "vuex";
import PublicApi from "@/api/publicApi";
import Order from "@/entities/Order";
const api = new PublicApi();
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from "@/utils/helpers";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      product: null,
      localCart: null,
    },
    getters: {
      products: (state) => state.products,
      categories: (state) => state.categories,
      product: (state) => state.product,
      localCart: (state) => state.localCart,
      total: (state) =>
        state.localCart
          ? state.localCart.products.reduce((sum, cartItem) => {
              sum += cartItem.price * cartItem.amount;
              return sum;
            }, 0)
          : 0,
    },
    actions: {
      async fetchProducts({ commit }) {
        try {
          const response = await api.getProducts();
          commit("SET_PRODUCTS", response.products);
          commit("SET_CATEGORIES", response.categories);
        } catch (e) {
          throw e;
        }
      },
      async fetchSingleProduct({ commit }, productId) {
        try {
          const response = await api.getSingleProduct(productId);
          commit("SET_PRODUCT", response.product);
          commit("SET_CATEGORIES", response.categories);
        } catch (e) {
          throw e;
        }
      },
      getCartFromLocalStorage({ commit }) {
        const localStorageItem = getLocalStorageItem("hrestykCart");
        if (localStorageItem) {
          console.log(JSON.parse(localStorageItem));
          commit("SET_LOCAL_CART", new Order(JSON.parse(localStorageItem)));
        }
      },
      setCartToLocalStorage({ dispatch }, cart) {
        if (!cart) {
          removeLocalStorageItem("hrestykCart");
        } else {
          setLocalStorageItem("hrestykCart", JSON.stringify(cart));
        }
        dispatch("getCartFromLocalStorage");
      },
      async addToCart({ dispatch }, order) {
        try {
          await api.addToCart(order);
          dispatch("getCartFromLocalStorage");
        } catch (e) {
          throw e;
        }
      },
    },
    mutations: {
      SET_PRODUCTS: (state, data) => {
        state.products = data;
      },
      SET_CATEGORIES: (state, data) => {
        state.categories = data;
      },
      SET_PRODUCT: (state, data) => {
        state.product = data;
      },
      SET_LOCAL_CART: (state, data) => {
        state.localCart = data;
      },
    },
  });
}
