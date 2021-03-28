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
          <label>
            <input
              v-model.number="amount"
              @keyup="$emit('changeAmount', {itemKey: $vnode.key, amount})"
            >
          </label>
          <div class="input-qnt-ctrl">
            <button
              class="input-qnt-up"
              :disabled="!isCartReady"
              @click="increase"
            />
            <button
              class="input-qnt-down"
              :disabled="!isCartReady"
              @click="decrease"
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
import {mapGetters} from "vuex";

export default {
  name: "CheckoutItem",
  props: {
    cartItem: OrderProduct
  },
  data() {
    return {
      amount: null
    }
  },
  computed: {
    ...mapGetters(["isCartReady"]),
    mainImageBase64() {
      if (this.cartItem.images.length === 0) return "";
      const mainImage = this.cartItem.images.find((image) => image.is_main);
      return mainImage ? mainImage.image : this.cartItem.images[0].image;
    },
  },
  methods: {
    increase() {
      this.amount += 1;
      this.$emit('changeAmount', {
        itemKey: this.$vnode.key,
        amount: this.amount
      });
    },
    decrease() {
      if (this.amount <= 1) return;
      this.amount -= 1;
      this.$emit('changeAmount', {
        itemKey: this.$vnode.key,
        amount: this.amount
      });
    },
    deleteProduct() {
      console.log('working so hard...');
    }
  },
  created() {
    this.amount = this.cartItem.amount;
  }
}
</script>

<style scoped>

</style>