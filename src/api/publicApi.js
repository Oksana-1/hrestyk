import axios from "axios";
import Product from "@/entities/Product";
import Order from "@/entities/Order";

export const BASE_URL_HOST = process.env.VUE_APP_BASE_URL_HOST;
export const BASE_URL_PORT = process.env.VUE_APP_BASE_URL_PORT;
export const ROOT_URL = `${BASE_URL_HOST}${
  BASE_URL_PORT ? ":" + BASE_URL_PORT : ""
}/`;
const API_VERSION = "api/v1/";
const BASE_URL = `${BASE_URL_HOST}${
  BASE_URL_PORT ? ":" + BASE_URL_PORT : ""
}/${API_VERSION}`;

const PRODUCTS_URL = "product/all";
const SINGLE_PRODUCT_URL = "product/single/";
const ADD_TO_CART = "/cart/add-product";
const GET_CART = "/cart/show";

axios.defaults.baseURL = BASE_URL;

export default class PublicApi {
  async getProducts() {
    try {
      const response = (await axios.get(PRODUCTS_URL)).data.data;
      return {
        products: response.products.map((item) => new Product(item)),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getSingleProduct(productId) {
    try {
      const response = (await axios.get(SINGLE_PRODUCT_URL + productId)).data
        .data;
      return {
        product: new Product(response.product),
        categories: response.categories,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async addToCart(order) {
    try {
      const response = await axios.post(ADD_TO_CART, order);
      const responseOrder = new Order(response.data.data);
      responseOrder.setOrderId(response.data.data._id);
      return responseOrder;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  async getCart(cart_id) {
    try {
      const response = await axios.get(`${GET_CART}/${cart_id}`);
      const responseOrder = new Order(response.data.data[0]);
      responseOrder.setOrderId(response.data.data[0]._id);
      return responseOrder;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
