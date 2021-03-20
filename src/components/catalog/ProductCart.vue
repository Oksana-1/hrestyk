<template>
  <div class="product-card-wrap">
    <router-link
      :to="'/catalog/' + product.id"
      class="link-abs"
    />
    <div class="product-card-inner">
      <div class="product-img-fix">
        <div
          v-if="mainImageUrl"
          class="product-img"
          :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"
        />
        <icon-base
          v-else
          class="product-img no-image"
          height="200"
          width="200"
          view-box="41.64 164.945 512 512"
        >
          <icon-no-image />
        </icon-base>
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
            @click="addProductToCart()"
          >
            <span>Купити</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "@/entities/Product";
import IconBase from "@/components/IconBase";
import IconNoImage from "@/components/icons/IconNoImage";
import {
  OrderProduct,
  OrderProductImage,
} from "@/entities/Order";

export default {
  props: {
    product:  Product,
  },
  components: {
    IconBase,
    IconNoImage,
  },
  computed: {
    mainImageUrl() {
      if (this.product.images.length === 0) return "";
      const mainImage = this.product.images.find((image) => image.is_main);
      return mainImage ? mainImage.url : this.product.images[0].url;
    },
    productCartObject() {
      return new OrderProduct({
        id: this.product.id,
        title: this.product.title,
        amount: 1,
        price: this.product.price,
        images: this.product.images.map(
          (image) =>
            new OrderProductImage({
              alt: image.alt,
              url: image.url,
              is_main: image.is_main,
            })
        ),
      });
    },
  },
  methods: {
    addProductToCart() {
      this.$emit('addProductToCart', this.productCartObject);
    }
  }
};
</script>