<template>
  <div class="col-50 col-cart">
    <spinner-cube v-if="busy" />
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
import {mapActions, mapGetters} from "vuex";
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
    ...mapGetters(["cart", "total"]),
  },
  methods: {
    ...mapActions(['getCart']),
    async init() {
      this.busy = true;
      try {
        await this.getCart();
      } catch (e) {
        console.error(e);
      }
    },
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
  },
  created() {
    this.init();
  }
};
</script>

<style scoped></style>