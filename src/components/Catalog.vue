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
          <transition name="fade" mode="out-in">
            <spinner-cube v-if="busy" />
            <div v-else class="catalog-products-container">
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
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["products", "categories"]),
    filteredProducts() {
      return this.currentCat === "all"
        ? this.products
        : this.products.filter(
            (product) => product.category === this.currentCat
          );
    },
  },
  methods: {
    ...mapActions(["fetchProducts", "addItemToCartProducts"]),
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
    addProductToCart(id) {
      this.addItemToCartProducts({ productId: id, amount: 1 });
    },
  },
  created() {
    this.init();
  },
};
</script>
