<template>
  <div class="cart-item">
    <div class="cart-item-img-fix">
      <router-link
        :to="'/catalog/' + cartItem.id"
        class="link-abs"
      />
      <div
        class="cart-item-img"
        :style="{ backgroundImage: 'url(data:image/jpg;base64,' + mainImageBase64 + ')' }"
      />
    </div>
    <div class="cart-item-info">
      <router-link
        :to="'/catalog/' + cartItem.id"
        class="cart-item-name"
      >
        {{ cartItem.title }}
      </router-link>
      <div class="cart-price-row">
        <div class="input-qnt">
          <label for="quantity">
            <input
              id="quantity"
              v-model.number="quantity"
              @keyup="changeAmount"
            >
          </label>
          <div class="input-qnt-ctrl">
            <div
              class="input-qnt-up"
              @click="changeAmount"
            />
            <div
              class="input-qnt-down"
              @click="changeAmount"
            />
          </div>
        </div>
        <div class="product-price">
          {{ cartItem.price }} грн
        </div>
        <div class="item-summ">
          {{ cartItem.price * cartItem.amount }} грн
        </div>
        <div
          class="cart-item-del"
          @click="deleteProduct"
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
  name: "CheckoutItem",
  props: {
    cartItem: OrderProduct
  },
  data() {
    return {
      quantity: null
    }
  },
  computed: {
    mainImageBase64() {
      if (this.cartItem.images.length === 0) return "";
      const mainImage = this.cartItem.images.find((image) => image.is_main);
      return mainImage ? mainImage.image : this.product.images[0].image;
    },
  },
  methods: {
    changeAmount() {
      console.log('working hard...');
    },
    deleteProduct() {
      console.log('working so hard...');
    }
  },
  created() {
    this.quantity = this.cartItem.amount;
  }
}
</script>

<style scoped>

</style>