<template>
  <div class="hr-cart-content">
    <div class="hr-cart-content-inner">
      <spinner-cube v-if="!isCartReady" />
      <template v-else>
        <div
          v-if="cart.length === 0"
          class="cart-info"
        >
          <div class="cart-title">
            Ваш кошик пустий
          </div>
          <router-link
            to="/catalog"
            class="hrestyk-btn-dark"
          >
            <div
              class="link-abs"
              @click="closeCart"
            />
            <span>В магазин</span>
          </router-link>
        </div>
        <div
          v-else
          class="cart-product"
        >
          <cart-item
            v-for="(cartItem, index) in cart"
            :key="prefix + index"
            :product="cartItem"
            @deleteItem="deleteItem"
            @changeAmount="changeAmount($event)"
          />
          <div class="card-total-row">
            <div class="total-sum">
              Загальна cума:
              <span class="total-num">
                {{ total }} грн
              </span>
            </div>
            <router-link
              to="/checkout"
              class="hrestyk-btn-dark"
            >
              <div
                class="link-abs"
                @click="closeCart"
              />
              <span>Оформити замовлення</span>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import eventBus from "../event-bus";
import { mapGetters } from "vuex";
import CartItem from "@/components/cart/CartItem";
import SpinnerCube from "@/components/ui/SpinnerCube";
export default {
  components: {SpinnerCube, CartItem},
  data() {
    return {
      prefix: 'cart-product-'
    }
  },
  computed: {
    ...mapGetters(["cart", "total", "isCartReady"]),
  },
  methods: {
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
    deleteItem(itemKey) {
      const index = itemKey.replace(this.prefix, '');
      console.log(index);
    },
    changeAmount({itemKey, amount}) {
      const index = itemKey.replace(this.prefix, '');
      console.log(`index: ${index}`);
      console.log(`amount: ${amount}`);
    }
  },
};
</script>
