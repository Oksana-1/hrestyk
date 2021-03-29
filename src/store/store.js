import Vue from "vue";
import Vuex from "vuex";
import PublicApi from "@/api/publicApi";
const api = new PublicApi();

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      product: {},
      cart: [],
      cartId: null,
      isCartReady: true,
    },
    getters: {
      products: (state) => state.products,
      categories: (state) => state.categories,
      product: (state) => state.product,
      cartId: (state) => state.cartId,
      total: (state) =>
        state.cart.reduce((sum, cartItem) => {
          sum += cartItem.price * cartItem.amount;
          return sum;
        }, 0),
      cart: (state) => state.cart,
      isCartReady: (state) => state.isCartReady,
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
      async addToCart({ commit }, order) {
        try {
          const response = await api.addToCart(order);
          commit("SET_CART_ID", response.id);
          commit("SET_CART", response.products);
          localStorage.setItem("cartId", response.id);
        } catch (e) {
          throw e;
        }
      },
      async getCart({ commit }, cart_id) {
        try {
          const response = await api.getCart(cart_id);
          commit("SET_CART_ID", response.id);
          commit("SET_CART", response.products);
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
      SET_CART_ID: (state, data) => {
        state.cartId = data;
      },
      SET_CART: (state, data) => {
        state.cart = data;
      },
      DISABLE_CART: (state) => {
        state.isCartReady = false;
      },
      ENABLE_CART: (state) => {
        state.isCartReady = true;
      },
    },
  });
}
