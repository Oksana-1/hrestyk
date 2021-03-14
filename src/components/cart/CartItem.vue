<template>
  <div class="cart-item">
    <div class="cart-item-img-fix">
      <div
        class="cart-item-img"
        :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"
      />
    </div>
    <div class="cart-item-info">
      <div class="cart-item-name">
        {{ product.title }}
      </div>
      <div class="cart-price-row">
        <div class="input-qnt">
          <label for="amount">
            <input
              id="amount"
              v-model.number="product.amount"
              @keyup="changeAmount($vnode.key)"
            >
          </label>
          <div class="input-qnt-ctrl">
            <div
              class="input-qnt-up"
              @click="changeAmount($vnode.key)"
            />
            <div
              class="input-qnt-down"
              @click="changeAmount($vnode.key)"
            />
          </div>
        </div>
        <div class="product-price">
          {{ product.price }} грн
        </div>
        <div
          class="cart-item-del"
          @click="$emit('deleteItem', $vnode.key)"
        >
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {OrderProduct} from "@/entities/Order";

export default {
  name: "CartItem",
  props: {
    product: OrderProduct
  },
  computed: {
    mainImageUrl() {
      if (this.product.images.length === 0) return "";
      const mainImage = this.product.images.find((image) => image.is_main);
      return mainImage ? mainImage.url : this.product.images[0].url;
    },
  },
  methods: {
    changeAmount(index) {
      console.log(index);
    },
  }
}
</script>

<style scoped>

</style>