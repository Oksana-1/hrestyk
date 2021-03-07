import axios from "axios";
import Product from "@/entities/Product";

export const BASE_HOST = "//95.179.185.226:8085/";
const API_VERSION = "api/v1/";

const PRODUCTS_URL = "product/all";
const SINGLE_PRODUCT_URL = "product/single/";

axios.defaults.baseURL = BASE_HOST + API_VERSION;

export const getProducts = async () => {
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
};
export const getSingleProduct = async (productId) => {
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
};