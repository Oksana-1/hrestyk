import Vue from "vue";
import Vuex from "vuex";
import PublicApi from "@/api/publicApi";
import { OrderProduct } from "@/entities/Order";
const api = new PublicApi();
import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  mergeArrayWithItemById,
  cloneObj,
  deleteItemFromArrayById,
} from "@/utils/helpers";

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      products: [],
      categories: [],
      product: null,
      cartProducts: [],
    },
    getters: {
      products: (state) => state.products,
      categories: (state) => state.categories,
      product: (state) => state.product,
      cartProducts: (state) => state.cartProducts,
      total: (state) =>
        state.cartProducts.reduce((sum, cartItem) => {
          sum += cartItem.price * cartItem.amount;
          return sum;
        }, 0),
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
          const cartProducts = JSON.parse(localStorageItem).map(
            (item) => new OrderProduct(item)
          );
          commit("SET_CART_PRODUCTS", cartProducts);
        }
      },
      addItemToCartProducts({ state, dispatch }, { productId, amount }) {
        const cartProduct = state.cartProducts.find(
          (item) => item.id === productId
        );
        const product =
          state.products.find((item) => item.id === productId) || state.product;
        const clonedProduct = cartProduct
          ? cloneObj(cartProduct)
          : product
          ? cloneObj(product)
          : null;
        clonedProduct.amount = amount;
        if (clonedProduct) {
          const newCartProducts = mergeArrayWithItemById(
            state.cartProducts,
            new OrderProduct(clonedProduct)
          );
          dispatch("setCartToLocalStorage", newCartProducts);
          dispatch("getCartFromLocalStorage");
        } else {
          throw new Error(`Product with id ${productId} not found!`);
        }
      },
      deleteItemFromCartProducts({ state, dispatch }, productId) {
        const newCartProducts = deleteItemFromArrayById(
          state.cartProducts,
          productId
        );
        dispatch("setCartToLocalStorage", newCartProducts);
        dispatch("getCartFromLocalStorage");
      },
      setCartToLocalStorage({ dispatch }, cartProducts) {
        if (!cartProducts) {
          removeLocalStorageItem("hrestykCart");
        } else {
          setLocalStorageItem("hrestykCart", JSON.stringify(cartProducts));
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
      SET_CART_PRODUCTS: (state, data) => {
        state.cartProducts = data;
      },
    },
  });
}
