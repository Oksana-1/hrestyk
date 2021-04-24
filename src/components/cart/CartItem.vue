<template>
  <div
    class="cart-item"
    :class="{busy }"
  >
    <div class="cart-item-img-fix">
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
      <div class="cart-item-name">
        {{ product.title }}
      </div>
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
          {{ `${product.price} ${currency.UAH}` }}
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
import {mapGetters} from "vuex";
import IconBase from "@/components/IconBase";
import IconNoImage from "@/components/icons/IconNoImage";
import { currency } from "@/entities/data/currency";

export default {
  name: "CartItem",
  props: {
    product: OrderProduct,
    busy: Boolean,
  },
  components: {
    IconBase,
    IconNoImage
  },
  data() {
    return {
      amount: null,
      currency
    }
  },
  computed: {
    ...mapGetters(["isCartReady"]),
    mainImageBase64() {
      if (this.product.images.length === 0) return "";
      const mainImage = this.product.images.find((image) => image.is_main);
      return mainImage ? mainImage.image : this.product.images[0].image;
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
    this.amount = this.product.amount;
  }
}
</script>

<style scoped>

</style>