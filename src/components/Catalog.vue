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
                @addProductToCart="addProductToLocalCart($event)"
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
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters(["products", "categories", "localCart"]),
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
  },
  methods: {
    ...mapActions([
      "fetchProducts",
      "setCartToLocalStorage",
      "getCartFromLocalStorage",
    ]),
    async init() {
      this.busy = true;
      try {
        await this.fetchProducts();
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
    filter(category) {
      this.busy = true;
      this.currentCat = category;
      this.busy = false;
    },
    getOrderObject(cartProduct) {
      const alreadyInCartProducts = this.localCart.products;
      return new Order({
        userInfo: this.userInfoObject,
        products: [...alreadyInCartProducts, cartProduct],
        processing: [this.processingStatusObject],
        orderStatus: "started",
      });
    },
    addProductToLocalCart(product) {
      const orderObject = this.getOrderObject(product);
      this.setCartToLocalStorage(orderObject);
      eventBus.$emit("cartVisibilityChange", true);
    },
  },
  created() {
    this.init();
  },
};
</script>
