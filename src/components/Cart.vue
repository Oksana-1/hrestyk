<template>
  <div class="hr-cart-content">
    <div class="hr-cart-content-inner">
      <div
        v-if="cartProducts.length === 0"
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
          v-for="(cartItem, index) in cartProducts"
          :key="prefix + index"
          :product="cartItem"
          :busy="busy"
          @deleteItem="deleteItem"
          @changeAmount="changeProductInCart($event)"
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
    ...mapGetters(["cartProducts", "total"]),
  },
  methods: {
    ...mapActions(["addItemToCartProducts"]),
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
    deleteItem(itemKey) {
      console.log("There must be `deleteItem fn`");
      console.log("itemKey:", itemKey);
      /*const index = itemKey.replace(this.prefix, "");
      const cartClone = cloneObj(this.cartForOrder);
      cartClone.splice(index, 1);
      this.changeProductInCart(this.getOrderObject(cartClone));*/
    },
    async changeProductInCart({ productId, amount }) {
      this.addItemToCartProducts({productId, amount});
      eventBus.$emit("cartVisibilityChange", true);
    },
  },
};
</script>
