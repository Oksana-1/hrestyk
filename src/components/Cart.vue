<template>
  <div class="hr-cart-content">
    <div class="hr-cart-content-inner">
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
        <div
          v-for="(cartItem, index) in cart"
          :key="`cart${cart.id}-product${index}`"
          class="cart-item"
        >
          <div class="cart-item-img-fix">
            <div
              class="cart-item-img"
              :style="{
                backgroundImage: 'url(' + cartItem.images[0].url + ')',
              }"
            />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">
              {{ cartItem.title }}
            </div>
            <div class="cart-price-row">
              <div class="input-qnt">
                <input
                  v-model.number="cartItem.amount"
                  @keyup="changeAmount(index)"
                >
                <div class="input-qnt-ctrl">
                  <div
                    class="input-qnt-up"
                    @click="changeAmount(index)"
                  />
                  <div
                    class="input-qnt-down"
                    @click="changeAmount(index)"
                  />
                </div>
              </div>
              <div class="product-price">
                {{ cartItem.price }} грн
              </div>
              <div
                class="cart-item-del"
                @click="deleteItem(index)"
              >
                +
              </div>
            </div>
          </div>
        </div>
        <div class="card-total-row">
          <div class="total-sum">
            Загальна cума: <span class="total-num">{{ getTotalSumm }} грн</span>
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
    </div>
  </div>
</template>

<script>
import eventBus from "../event-bus";
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["cart", "getTotalSumm"]),
  },
  methods: {
    ...mapMutations(["DELETE_ITEM", "CHANGE_QNT"]),
    changeAmount(index) {
      console.log(index);
    },
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
    deleteItem(index) {
      console.log(index);
    }
  },
};
</script>
