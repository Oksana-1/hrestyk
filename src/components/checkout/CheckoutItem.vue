<template>
  <div
    class="cart-item"
    :class="{busy}"
  >
    <div class="cart-item-img-fix">
      <router-link
        :to="'/catalog/' + cartItem.id"
        class="link-abs"
      />
      <div
        v-if="mainImageBase64"
        class="cart-item-img"
        :style="{ backgroundImage: 'url(data:image/jpg;base64,' + mainImageBase64 + ')' }"
      />
      <icon-base
        v-else
        class="cart-item-img no-image"
        height="100"
        width="100"
        view-box="41.64 164.945 512 512"
      >
        <icon-no-image />
      </icon-base>
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
              :disabled="busy"
              @keyup="$emit('changeAmount', {itemKey: $vnode.key, amount})"
            >
          </label>
          <div class="input-qnt-ctrl">
            <button
              class="input-qnt-up"
              :disabled="busy"
              @click="increase"
            />
            <button
              class="input-qnt-down"
              :disabled="busy"
              @click="decrease"
            />
          </div>
        </div>
        <div class="product-price">
          {{ `${cartItem.price} ${currency.UAH}` }}
        </div>
        <div class="item-summ">
          {{ `${cartItem.price * cartItem.amount} ${currency.UAH}` }}
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
import IconBase from "@/components/IconBase";
import IconNoImage from "@/components/icons/IconNoImage";
import { currency } from "@/entities/data/currency";

export default {
  name: "CheckoutItem",
  props: {
    cartItem: OrderProduct,
    busy: Boolean,
  },
  components: {
    IconBase,
    IconNoImage,
  },
  data() {
    return {
      amount: null,
      currency
    }
  },
  computed: {
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
  },
  created() {
    this.amount = this.cartItem.amount;
  }
}
</script>

<style scoped>

</style>