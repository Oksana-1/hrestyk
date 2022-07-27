<template>
  <div class="col-50 col-cart">
    <h2 class="small-title">
      {{ headerTexts.cart }}
    </h2>
    <div
      v-if="cartProducts.length > 0"
      class="checkout-cart"
    >
      <div class="cart-note-wrap">
        <div class="cart-note">
          {{ noteTexts.inYourCartNote }}
          <span class="cart-qnt">{{ cartProducts.length }}</span>
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
          v-for="(cartItem, index) in cartProducts"
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import eventBus from "@/event-bus";
import CheckoutItem from "@/components/checkout/CheckoutItem";
import { btnText } from "@/entities/data/btnTexts";
import { headerTexts, noteTexts } from "@/entities/data/texts";
import { currency } from "@/entities/data/currency";

export default {
  name: "OrderCart",
  components: { CheckoutItem },
  data() {
    return {
      busy: false,
      prefix: "checkout-product-",
      btnText,
      headerTexts,
      noteTexts,
      currency,
    };
  },
  computed: {
    ...mapGetters(["cartProducts", "total"]),
    itemString() {
      let getCartLengthStr = this.cartProducts.length.toString();
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
  },
  methods: {
    ...mapActions(["addToCart"]),
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
    deleteItem(itemKey) {
      console.log("There must be `deleteItem` fn");
      console.log("itemKey", itemKey);
     /* const index = itemKey.replace(this.prefix, "");
      const cartClone = cloneObj(this.cartForOrder);
      cartClone.splice(index, 1);
      this.changeProductInCart(this.getOrderObject(cartClone));*/
    },
    changeAmount({ itemKey, amount }) {
      console.log("There must be `changeAmount` fn");
      console.log("itemKey", itemKey);
      console.log("amount", amount);
     /* const cartClone = cloneObj(this.cartForOrder);
      const index = itemKey.replace(this.prefix, "");
      cartClone[index].amount = amount;
      this.changeProductInCart(this.getOrderObject(cartClone));*/
    },
  },
};
</script>

<style scoped></style>
