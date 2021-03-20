import axios from "axios";
import Product from "@/entities/Product";
import Order from "@/entities/Order";

export const BASE_HOST = "http://95.179.185.226:8085/";
const API_VERSION = "api/v1/";

const PRODUCTS_URL = "product/all";
const SINGLE_PRODUCT_URL = "product/single/";
const ADD_TO_CART = "/cart/add-product";
const GET_CART = "/cart/show";

axios.defaults.baseURL = BASE_HOST + API_VERSION;

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
      const responseOrder = new Order(response.data.data);
      responseOrder.setOrderId(response.data.data._id);
      return responseOrder;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
