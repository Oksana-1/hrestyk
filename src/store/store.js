import Vue from "vue";
import Vuex from "vuex";
import { loadForm, loadOrder } from "@/api";
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
      totalSumm: 0,
    },
    getters: {
      products: (state) => state.products,
      categories: (state) => state.categories,
      product: (state) => state.product,
      cartId: (state) => state.cartId,
      getTotalSumm: (state) => {
        return state.totalSumm;
      },
      cart: (state) => state.cart,
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
        } catch (e) {
          throw e;
        }
      },
      async getCart({ commit }) {
        try {
          const response = await api.getCart();
          commit("SET_CART", response);
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
      ADD_TO_CARD: (state, { productId, quantity }) => {
        const productIndex = state.cart.findIndex(
          (item) => item.productId === productId
        );
        const currentProduct = state.products.filter(
          (product) => product.productId === productId
        )[0];
        if (productIndex === -1) {
          const newItem = {
            productId: productId,
            quantity: quantity,
            mainImage: currentProduct.mainImage,
            productName: currentProduct.productName,
            productPrice: currentProduct.productPrice,
          };
          state.cart.push(newItem);
        } else {
          const newItem = {
            productId: productId,
            quantity: state.cart[productIndex].quantity + quantity,
            mainImage: currentProduct.mainImage,
            productName: currentProduct.productName,
            productPrice: currentProduct.productPrice,
          };
          state.cart.splice(productIndex, 1, newItem);
        }
        state.totalSumm = state.cart.reduce((total, item) => {
          return total + item.quantity * item.productPrice;
        }, 0);
        const storageStr = state.cart.reduce((string, item) => {
          return string.concat(item.productId, ":", item.quantity, ",");
        }, "");
        localStorage.setItem("storageCart", storageStr);
      },
      DELETE_ITEM: (state, itemId) => {
        const itemIndex = state.cart.findIndex(
          (item) => item.productId === itemId
        );
        if (itemIndex !== -1) {
          state.cart.splice(itemIndex, 1);
        }
        state.totalSumm = state.cart.reduce((total, item) => {
          return total + item.quantity * item.productPrice;
        }, 0);
        const storageStr = state.cart.reduce((string, item) => {
          return string.concat(item.productId, ":", item.quantity, ",");
        }, "");
        localStorage.setItem("storageCart", storageStr);
      },
      CHANGE_QNT: (state, { itemId, itemQnt }) => {
        const itemIndex = state.cart.findIndex(
          (item) => item.productId === itemId
        );
        if (itemIndex != -1 && itemQnt > 0) {
          const renewedItem = {
            productId: itemId,
            quantity: itemQnt,
            mainImage: state.cart[itemIndex].mainImage,
            productName: state.cart[itemIndex].productName,
            productPrice: state.cart[itemIndex].productPrice,
          };
          state.cart.splice(itemIndex, 1, renewedItem);
        }
        const totalSumm = state.cart.reduce((total, item) => {
          return total + item.quantity * item.productPrice;
        }, 0);
        state.totalSumm = totalSumm;
        const storageStr = state.cart.reduce((string, item) => {
          return string.concat(item.productId, ":", item.quantity, ",");
        }, "");
        localStorage.setItem("storageCart", storageStr);
      },
      SET_CART: (state, data) => {
        state.cart = data;
      },
      SEND_ORDER: (state, checkoutFormData) => {
        const order = {
          date: Date.now(),
          cartInfo: state.cart,
          customerInfo: checkoutFormData,
        };
        loadOrder(order).then((response) => {
          window.location.href = "/thankyou";
          localStorage.removeItem("storageCart");
        });
      },
      SEND_FORM: (state, footerFormData) => {
        const formData = {
          date: Date.now(),
          formInfo: footerFormData,
        };
        loadForm(formData);
      },
    },
  });
}
