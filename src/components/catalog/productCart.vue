<template>
  <div class="product-card-wrap">
    <router-link
      :to="'/catalog/' + product.id"
      class="link-abs"
    />
    <div class="product-card-inner">
      <div class="product-img-fix">
        <div
          class="product-img"
          :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"
        />
      </div>
      <div class="product-info">
        <div class="product-name">
          {{ product.title }}.
        </div>
        <div class="buy-btn-row">
          <div class="product-price">
            {{ product.price }} грн
          </div>
          <button
            class="hrestyk-btn-dark buyBtn"
            @click="addToCartProduct()"
          >
            <span>Купити</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import eventBus from "../../event-bus";
import Product from "@/entities/Product";
export default {
  props: {
    product: {
      type: Product,
      default: {},
    },
  },
  computed: {
    mainImageUrl() {
      if (this.product.images.length === 0) return '';
      const mainImage = this.product.images.find(image => image.is_main);
      return mainImage ? mainImage.url : this.product.images[0].url;
    }
  },
  methods: {
    ...mapMutations(["ADD_TO_CARD"]),
    addToCartProduct() {
      const order = {
        productId: this.product.productId,
        quantity: 1,
      };
      this.ADD_TO_CARD(order);
      eventBus.$emit("cartVisibilityChange", true);
    },
  },
};
</script>
