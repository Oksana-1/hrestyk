<template>
  <div class="catalog-content hr-content">
    <slot>
      <div class="catalog-category-section">
        <div class="c-box-1100">
          <div
            class="catalog-category-container c-box-700"
            :class="filtersHidden ? 'hidden' : ''"
          >
            <ul class="catalog-category-list">
              <li :class="{ active: currentCat === 'all' }">
                <a @click="filter('all')"> Всі товари </a>
              </li>
              <li
                v-for="(category, index) in categories"
                :key="`category-${index}`"
                :class="{ active: currentCat === category }"
              >
                <a @click="filter(category)">
                  {{ category }}
                </a>
              </li>
            </ul>
            <div
              class="mob-filters-ctrl"
              @click="filtersHidden = !filtersHidden"
            />
          </div>
        </div>
      </div>
      <div class="catalog-products-section">
        <div class="c-box-1100">
          <transition
            name="fade"
            mode="out-in"
          >
            <spinner-cube v-if="busy" />
            <div
              v-else
              class="catalog-products-container"
            >
              <product-card
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
                @addProductToCart="addProductToCart($event)"
              />
            </div>
          </transition>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
import ProductCard from "./catalog/ProductCart";
import SpinnerCube from "@/components/ui/SpinnerCube";
import {mapActions, mapGetters, mapMutations} from "vuex";
import eventBus from "@/event-bus";
import { userInfoForm } from "@/entities/forms/userInfoForm";
import Order, { ProcessingStatus, UserInfo } from "@/entities/Order";

export default {
  components: {
    SpinnerCube,
    ProductCard,
  },
  data() {
    return {
      filtersHidden: false,
      currentCat: "all",
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["products", "categories", "cart", "cartId"]),
    filteredProducts() {
      return this.currentCat === "all"
        ? this.products
        : this.products.filter(
            (product) => product.category === this.currentCat
          );
    },
    userInfoObject() {
      return new UserInfo(userInfoForm);
    },
    processingStatusObject() {
      return new ProcessingStatus({
        processingStatus: "started",
        content: "Init order processing",
      });
    },
    cartForOrder() {
      return this.cart.map((cartItem) => {
        cartItem.images.forEach((image) => {
          delete image.image;
          return image;
        });
        return cartItem;
      });
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "addToCart"]),
    ...mapMutations(["DISABLE_CART", "ENABLE_CART"]),
    async init() {
      this.busy = true;
      await this.fetchProducts();
      this.busy = false;
    },
    filter(category) {
      this.busy = true;
      this.currentCat = category;
      this.busy = false;
    },
    getOrderObject(cartProduct) {
      return new Order({
        userInfo: this.userInfoObject,
        products: [...this.cartForOrder, cartProduct],
        processing: [this.processingStatusObject],
        orderStatus: "started",
      });
    },
    async addProductToCart(product) {
      const orderObject = this.getOrderObject(product);
      if (this.cartId) orderObject.setOrderId(this.cartId);
      this.DISABLE_CART()
      try {
        await this.addToCart(orderObject);
        eventBus.$emit("cartVisibilityChange", true);
      } catch (e) {
        console.error(e);
      } finally {
        this.ENABLE_CART();
      }
    },
  },
  created() {
    this.init();
  },
};
</script>