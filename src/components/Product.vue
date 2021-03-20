<template>
  <div class="product-content hr-content">
    <template v-if="!busy">
      <div class="catalog-category-section">
        <div class="c-box-1100">
          <div class="catalog-category-container">
            <h1 class="common-title">
              {{ product.title }}
            </h1>
          </div>
        </div>
      </div>
      <div class="product-section waypoint">
        <div class="c-box-1100 animate opacity">
          <div class="c-cont">
            <div class="col-50">
              <product-images />
            </div>
            <div class="col-50">
              <div class="col-inner col-product-desc">
                <div class="product-body">
                  <div
                    class="editor-content`"
                    v-html="product.description"
                  />
                  <div class="product-info col-product-info">
                    <div class="buy-qnt-row">
                      <div class="input-qnt">
                        <label>
                          <input v-model.number="quantity">
                        </label>
                        <div class="input-qnt-ctrl">
                          <div
                            class="input-qnt-up"
                            @click="addOne"
                          />
                          <div
                            class="input-qnt-down"
                            @click="minusOne"
                          />
                        </div>
                      </div>
                      <div class="product-price">
                        {{ product.price }} грн
                      </div>
                      <button
                        class="hrestyk-btn-dark buyBtn"
                        :disabled="quantity <= 0 || !Number.isInteger(quantity)"
                        @click="addProductToCart"
                      >
                        <span>Купити</span>
                      </button>
                    </div>
                  </div>
                  <div class="descr-note">
                    <p>
                      *Ми робимо все можливе, щоб показати справжні кольори на
                      своїх фотографіях. Але вони сильно залежать від
                      освітлення, і звичайно кольори можуть дещо відрізнятися на
                      різних моніторах.
                    </p>
                    <p>Будь ласка, майте це на увазі!</p>
                  </div>
                  <div class="sep-line-img">
                    <img
                      class="fits"
                      src="@/assets/images/logo.png"
                      alt="Logo"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <about-banner />
  </div>
</template>
<script>
import eventBus from "../event-bus";
import { mapGetters, mapActions } from "vuex";
import AboutBanner from "./main/AboutBanner";
import ProductImages from "@/components/product/ProductImages";
import Order, {OrderProduct, OrderProductImage, ProcessingStatus, UserInfo} from "@/entities/Order";
import {userInfoForm} from "@/entities/forms/userInfoForm";
export default {
  props: {
    initWaypointProp: {
      "type": Function,
      "default": {},
    },
  },
  components: {
    ProductImages,
    AboutBanner,
  },
  data() {
    return {
      productId: this.$route.params.id,
      productSliderOptions: {
        init: false,
        loop: true,
        width: 150,
        spaceBetween: 10,
        slidesPerView: 3,
      },
      quantity: 1,
      busy: true,
    };
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  computed: {
    ...mapGetters(["product", "cart", "cartId"]),
    productCartObject() {
      return new OrderProduct({
        id: this.product.id,
        title: this.product.title,
        amount: this.quantity,
        price: this.product.price,
        images: this.product.images.map(
          (image) =>
            new OrderProductImage({
              alt: image.alt,
              url: image.url,
              is_main: image.is_main,
            })
        ),
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
    cartForOrder() {
      return this.cart.map((cartItem) => {
        cartItem.images.forEach((image) => {
          delete image.image;
          return image;
        });
        return cartItem;
      });
    },
  },
  methods: {
    ...mapActions(["fetchSingleProduct", "addToCart"]),
    addOne() {
      if (this.quantity >= 0) {
        this.quantity++;
      }
    },
    minusOne() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async init() {
      try {
        await this.fetchSingleProduct(this.productId);
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
        requestAnimationFrame(() => {
          this.initWaypointProp();
        });
      }
    },
    getOrderObject(cartProduct) {
      return new Order({
        userInfo: this.userInfoObject,
        products: [...this.cartForOrder, cartProduct],
        processing: [this.processingStatusObject],
        orderStatus: "started",
      });
    },
    async addProductToCart() {
      const orderObject = this.getOrderObject(this.productCartObject);
      if (this.cartId) orderObject.setOrderId(this.cartId);
      try {
        await this.addToCart(orderObject);
        eventBus.$emit("cartVisibilityChange", true);
      } catch (e) {
        console.error(e);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>