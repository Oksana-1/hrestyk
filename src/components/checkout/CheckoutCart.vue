<template>
  <div class="col-50 col-cart">
    <spinner-cube v-if="!isCartReady" />
    <template v-else>
      <h2 class="small-title">
        {{ headerTexts.cart }}
      </h2>
      <div
        v-if="cart.length > 0"
        class="checkout-cart"
      >
        <div class="cart-note-wrap">
          <div class="cart-note">
            {{ noteTexts.inYourCartNote }}
            <span class="cart-qnt">{{ cart.length }}</span>
            {{ itemString }}
          </div>
          <router-link
            to="/catalog"
            class="hrestyk-btn-bordered-white"
          >
            <div
              class="link-abs"
              @click="closeCart"
            />
            <span>{{ btnText.continueShopping }}</span>
          </router-link>
        </div>
        <div class="checkout-cart-cont">
          <checkout-item
            v-for="(cartItem, index) in cart"
            :key="prefix + index"
            :cart-item="cartItem"
            :busy="busy"
            @changeAmount="changeAmount($event)"
            @deleteItem="deleteItem"
          />
        </div>
        <div class="card-total-row">
          <div class="total-sum">
            {{ noteTexts.totalSum }}
            <span class="total-num">{{ `${total} ${currency.UAH}` }}</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="checkout-cart-empty"
      >
        <div class="cart-note-wrap">
          <div class="cart-note">
            {{ noteTexts.emptyCart }}
          </div>
          <router-link
            to="/catalog"
            class="hrestyk-btn-bordered-white"
          >
            <div
              class="link-abs"
              @click="closeCart"
            />
            <span>{{ btnText.continueShopping }}</span>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SpinnerCube from "@/components/ui/SpinnerCube";
import {mapActions, mapGetters, mapMutations} from "vuex";
import eventBus from "@/event-bus";
import CheckoutItem from "@/components/checkout/CheckoutItem";
import {cloneObj} from "@/utils/helpers";
import Order, {ProcessingStatus, UserInfo} from "@/entities/Order";
import {userInfoForm} from "@/entities/forms/userInfoForm";
import { btnText } from "@/entities/data/btnTexts";
import { headerTexts, noteTexts } from "@/entities/data/texts";
import { currency } from "@/entities/data/currency";

export default {
  name: "OrderCart",
  components: {CheckoutItem, SpinnerCube },
  data() {
    return {
      busy: false,
      prefix: 'checkout-product-',
      btnText,
      headerTexts,
      noteTexts,
      currency
    };
  },
  computed: {
    ...mapGetters(["cart", "total", "isCartReady"]),
    itemString() {
      let getCartLengthStr = this.cart.length.toString();
      let singleNumExeptions = ["2", "3", "4"];
      let doubleNumExeptions = ["11", "12", "13", "14"];
      let lastChar = getCartLengthStr.substr(-1);
      let lastTwo = getCartLengthStr.substr(-2);
      if (doubleNumExeptions.indexOf(lastTwo) !== -1) {
        return "товарів";
      } else {
        if (lastChar === "1") {
          return "товар";
        } else if (singleNumExeptions.indexOf(lastChar) !== -1) {
          return "товари";
        } else {
          return "товарів";
        }
      }
    },
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
    ...mapMutations(["DISABLE_CART", "ENABLE_CART"]),
    ...mapActions(["addToCart"]),
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
      if (this.cartId) orderObject.setOrderId(this.cartId);
      this.busy = true;
      try {
        await this.addToCart(orderObject);
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
  },
};
</script>

<style scoped></style>