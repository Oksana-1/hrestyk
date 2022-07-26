<template>
  <div class="hr-cart-content">
    <div class="hr-cart-content-inner">
      <div
        v-if="!localCart || localCart.products.length === 0"
        class="cart-info"
      >
        <div class="cart-title">
          {{ noteTexts.emptyCart }}
        </div>
        <router-link
          to="/catalog"
          class="hrestyk-btn-dark"
        >
          <div
            class="link-abs"
            @click="closeCart"
          />
          <span>{{ btnText.goToShop }}</span>
        </router-link>
      </div>
      <div
        v-else
        class="cart-product"
      >
        <cart-item
          v-for="(cartItem, index) in localCart.products"
          :key="prefix + index"
          :product="cartItem"
          :busy="busy"
          @deleteItem="deleteItem"
          @changeAmount="changeAmount($event)"
        />
        <div class="card-total-row">
          <div class="total-sum">
            {{ noteTexts.totalSum }}
            <span class="total-num"> {{ `${total} ${currency.UAH}` }} </span>
          </div>
          <router-link
            to="/checkout"
            class="hrestyk-btn-dark"
          >
            <div
              class="link-abs"
              @click="closeCart"
            />
            <span>{{ btnText.checkout }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../event-bus";
import { mapActions, mapGetters } from "vuex";
import CartItem from "@/components/cart/CartItem";
import Order, { ProcessingStatus, UserInfo } from "@/entities/Order";
import { userInfoForm } from "@/entities/forms/userInfoForm";
import { cloneObj } from "@/utils/helpers";
import { btnText } from "@/entities/data/btnTexts";
import { noteTexts } from "@/entities/data/texts";
import { currency } from "@/entities/data/currency";

export default {
  components: { CartItem },
  data() {
    return {
      prefix: "cart-product-",
      busy: false,
      btnText,
      noteTexts,
      currency,
    };
  },
  computed: {
    ...mapGetters(["localCart", "total"]),
    cartForOrder() {
      const cartClone = cloneObj(this.cart);
      return cartClone.map((cartItem) => {
        cartItem.images.forEach((image) => {
          delete image.image;
          return image;
        });
        return cartItem;
      });
    },
    userInfoObject() {
      return new UserInfo(userInfoForm);
    },
    processingStatusObject() {
      return new ProcessingStatus({
        processingStatus: "started",
        content: "Init order processing",
      });
    },
  },
  methods: {
    ...mapActions(["addToLocalCart"]),
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
    deleteItem(itemKey) {
      const index = itemKey.replace(this.prefix, "");
      const cartClone = cloneObj(this.cartForOrder);
      cartClone.splice(index, 1);
      this.changeProductInCart(this.getOrderObject(cartClone));
    },
    changeAmount({ itemKey, amount }) {
      const cartClone = cloneObj(this.cartForOrder);
      const index = itemKey.replace(this.prefix, "");
      cartClone[index].amount = amount;
      this.changeProductInCart(this.getOrderObject(cartClone));
    },
    getOrderObject(newCart) {
      return new Order({
        userInfo: this.userInfoObject,
        products: newCart,
        processing: [this.processingStatusObject],
        orderStatus: "started",
      });
    },
    async changeProductInCart(orderObject) {
      await this.addToLocalCart(orderObject);
      eventBus.$emit("cartVisibilityChange", true);
    },
  },
};
</script>
