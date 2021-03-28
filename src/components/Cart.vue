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
              <span class="total-num"> {{ total }} грн </span>
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import CartItem from "@/components/cart/CartItem";
import SpinnerCube from "@/components/ui/SpinnerCube";
import Order, { ProcessingStatus, UserInfo } from "@/entities/Order";
import { userInfoForm } from "@/entities/forms/userInfoForm";
import { cloneObj } from "@/utils/helpers";
export default {
  components: { SpinnerCube, CartItem },
  data() {
    return {
      prefix: "cart-product-",
    };
  },
  computed: {
    ...mapGetters(["cart", "cartId", "total", "isCartReady"]),
    cartForOrder() {
      return this.cart.map((cartItem) => {
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
      console.log(index);
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
      this.DISABLE_CART();
      try {
        await this.addToCart(orderObject);
        eventBus.$emit("cartVisibilityChange", true);
      } catch (e) {
        console.error(e);
      } finally {
        this.ENABLE_CART();
      }
    },
  },
};
</script>
