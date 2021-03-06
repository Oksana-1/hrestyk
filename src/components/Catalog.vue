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
                <a
                  href="#"
                  @click.prevent="(filterOn = false), (currentCat = 'all')"
                  >Всі товари</a
                >
              </li>
              <li
                v-for="(category, i) in categories"
                :key="i"
                :class="{ active: currentCat === category }"
              >
                <a
                  @click.prevent="
                    filterCat(category),
                      (filterOn = true),
                      (currentCat = category)
                  "
                  href="#"
                >
                  {{ category }}
                </a>
              </li>
            </ul>
            <div
              class="mob-filters-ctrl"
              @click="filtersHidden = !filtersHidden"
            ></div>
          </div>
        </div>
      </div>
      <div class="catalog-products-section">
        <div class="c-box-1100">
          <transition name="fade" mode="out-in">
            <div :key="currentCat">
              <div
                class="catalog-products-container productContainer"
                v-if="!filterOn"
              >
                <app-product-card
                  v-for="(productItem) in products"
                  :key="productItem.id"
                  :product="productItem"
                ></app-product-card>
              </div>
              <div v-else class="catalog-products-container">
                <app-product-card
                  v-for="(productItem) in getfilteredProducts"
                  :key="productItem.id"
                  :product="productItem"
                ></app-product-card>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </slot>
  </div>
</template>
<script>
import productCard from "./catalog/productCart";
import {mapActions, mapGetters} from "vuex";
import { mapMutations } from "vuex";
export default {
  components: {
    appProductCard: productCard,
  },
  data() {
    return {
      filterOn: false,
      filtersHidden: false,
      currentCat: "all",
      busy: false,
    };
  },
  computed: {
    ...mapGetters(["products", "categories", "getfilteredProducts"]),
  },
  methods: {
    ...mapActions(['fetchProducts']),
    ...mapMutations(["FILTER_CAT"]),
    filterCat(category) {
      this.FILTER_CAT(category);
    },
    async init() {
      this.busy = true;
      await this.fetchProducts();
      this.busy = false;
    }
  },
  created() {
    this.init();
  }
};
</script>
