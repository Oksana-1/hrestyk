<template>
  <div class="hr-cart-content">
    <div class="hr-cart-content-inner">
      <div v-if="cart.length === 0" class="cart-info">
        <div class="cart-title">Ваш кошик пустий</div>
        <router-link class="hrestyk-btn-dark" to="/catalog">
          <div class="link-abs" @click="closeCart" />
          <span>В магазин</span>
        </router-link>
      </div>
      <div class="cart-product" v-else>
        <div class="cart-item" v-for="(cartItem, i) in cart" :key="i">
          <div class="cart-item-img-fix">
            <div
              class="cart-item-img"
              :style="{
                backgroundImage: 'url(' + cartItem.mainImage + ')',
              }"
            ></div>
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">{{ cartItem.productName }}</div>
            <div class="cart-price-row">
              <div class="input-qnt">
                <input
                  v-model.number="cartItem.quantity"
                  @keyup="changeQnt(cartItem.productId, cartItem.quantity)"
                />
                <div class="input-qnt-ctrl">
                  <div
                    class="input-qnt-up"
                    @click="
                      changeQnt(cartItem.productId, cartItem.quantity + 1)
                    "
                  ></div>
                  <div
                    class="input-qnt-down"
                    @click="
                      changeQnt(cartItem.productId, cartItem.quantity - 1)
                    "
                  ></div>
                </div>
              </div>
              <div class="product-price">{{ cartItem.productPrice }} грн</div>
              <div
                class="cart-item-del"
                @click="DELETE_ITEM(cartItem.productId)"
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
          <router-link to="/checkout" class="hrestyk-btn-dark">
            <div class="link-abs" @click="closeCart"></div>
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
    changeQnt(id, qnt) {
      const itemToChange = {
        itemId: id,
        itemQnt: qnt,
      };
      this.CHANGE_QNT(itemToChange);
    },
    closeCart() {
      eventBus.$emit("cartVisibilityChange", false);
    },
  },
};
</script>
