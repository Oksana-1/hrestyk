<template>
  <div class="col-50 col-cart">
    <spinner-cube v-if="!isCartReady" />
    <template v-else>
      <h2 class="small-title">
        Кошик
      </h2>
      <div
        v-if="cart.length > 0"
        class="checkout-cart"
      >
        <div class="cart-note-wrap">
          <div class="cart-note">
            У Вашому кошику
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
            <span>Продовжити покупки</span>
          </router-link>
        </div>
        <div class="checkout-cart-cont">
          <checkout-item
            v-for="(cartItem, i) in cart"
            :key="`cartItem-${i}`"
            :cart-item="cartItem"
          />
        </div>
        <div class="card-total-row">
          <div class="total-sum">
            Загальна cума:
            <span class="total-num">{{ total }} грн</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="checkout-cart-empty"
      >
        <div class="cart-note-wrap">
          <div class="cart-note">
            У Вашому кошику немає товарів
          </div>
          <router-link
            to="/catalog"
            class="hrestyk-btn-bordered-white"
          >
            <div
              class="link-abs"
              @click="closeCart"
            />
            <span>Повернутися в магазин</span>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import SpinnerCube from "@/components/ui/SpinnerCube";
import {mapGetters} from "vuex";
import eventBus from "@/event-bus";
import CheckoutItem from "@/components/checkout/CheckoutItem";
export default {
  name: "OrderCart",
  components: {CheckoutItem, SpinnerCube },
  data() {
    return {
      busy: false,
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
  },
  methods: {
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
  },
};
</script>

<style scoped></style>