<template>
  <div
    class="cart-item"
    :class="{ busy }"
  >
    <div class="cart-item-img-fix">
      <router-link
        :to="'/catalog/' + cartItem._id"
        class="link-abs"
      />
      <div
        v-if="mainUrl"
        class="cart-item-img"
        :style="{ backgroundImage: `url(${mainUrl})` }"
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
        :to="'/catalog/' + cartItem._id"
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
              @keyup="changeAmount"
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
import { OrderProduct } from "@/entities/Order";
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
      currency,
    };
  },
  computed: {
    mainUrl() {
      if (this.cartItem.images.length === 0) return "";
      const mainImage = this.cartItem.images.find((image) => image.is_main);
      return mainImage ? mainImage.url : this.cartItem.images[0].url;
    },
  },
  methods: {
    increase() {
      this.amount += 1;
      this.$emit("changeAmount", {
        productId: this.cartItem._id,
        amount: this.amount,
      });
    },
    decrease() {
      if (this.amount <= 1) return;
      this.amount -= 1;
      this.$emit("changeAmount", {
        productId: this.cartItem._id,
        amount: this.amount,
      });
    },
    changeAmount() {
      if (!Number.isInteger(this.amount)) return;
      if (this.amount <= 1) {
        this.amount = 1;
      }
      this.$emit("changeAmount", {
        productId: this.cartItem._id,
        amount: this.amount,
      });
    },
  },
  created() {
    this.amount = this.cartItem.amount;
  },
};
</script>

<style scoped></style>
