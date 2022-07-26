<template>
  <div class="product-content hr-content">
    <spinner-cube v-if="busy" />
    <template v-else>
      <template v-if="product">
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
                      :v-html="product.description"
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
                          :disabled="
                            quantity <= 0 || !Number.isInteger(quantity)
                          "
                          @click="addProductToCart"
                        >
                          <span v-if="!isInCart">{{ btnText.buy }}</span>
                          <span v-else>{{ btnText.alreadyInCart }}</span>
                        </button>
                      </div>
                    </div>
                    <div
                      class="descr-note"
                      v-html="warnings.colorMismatch"
                    />
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
    </template>
    <about-banner />
  </div>
</template>
<script>
import eventBus from "../event-bus";
import { mapGetters, mapActions } from "vuex";
import AboutBanner from "./main/AboutBanner";
import ProductImages from "@/components/product/ProductImages";
import SpinnerCube from "@/components/ui/SpinnerCube";
import Order, {
  OrderProduct,
  OrderProductImage,
  ProcessingStatus,
  UserInfo,
} from "@/entities/Order";
import { userInfoForm } from "@/entities/forms/userInfoForm";
import { btnText } from "@/entities/data/btnTexts";
import { warnings } from "@/entities/data/warnings";

export default {
  name: "ProductInner",
  components: {
    ProductImages,
    AboutBanner,
    SpinnerCube,
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
      busy: false,
      btnText,
      warnings,
    };
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  computed: {
    ...mapGetters(["product", "localCart"]),
    productCartObject() {
      return new OrderProduct({
        _id: this.product.id,
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
    cartProductsForOrder() {
      return this.localCart && this.localCart.products.length > 0
        ? this.localCart.products.map((cartItem) => {
            cartItem.images.forEach((image) => {
              delete image.image;
              return image;
            });
            return cartItem;
          })
        : [];
    },
    isInCart() {
      return this.localCart
        ? Boolean(
            this.localCart.products.find((item) => item.id === this.productId)
          )
        : false;
    },
  },
  methods: {
    ...mapActions(["fetchSingleProduct", "setCartToLocalStorage"]),
    addOne() {
      if (this.quantity >= 0) {
        this.quantity++;
        const orderObject = this.getOrderObject(this.productCartObject);
        this.setCartToLocalStorage(orderObject);
        eventBus.$emit("cartVisibilityChange", true);
      }
    },
    minusOne() {
      if (this.quantity > 1) {
        this.quantity--;
        const orderObject = this.getOrderObject(this.productCartObject);
        this.setCartToLocalStorage(orderObject);
        eventBus.$emit("cartVisibilityChange", true);
      }
    },
    async init() {
      this.busy = true;
      try {
        await this.fetchSingleProduct(this.productId);
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
        requestAnimationFrame(() => {
          this.initWaypoint();
        });
      }
    },
    getOrderObject(cartProduct) {
      return new Order({
        userInfo: this.userInfoObject,
        products: [...this.cartProductsForOrder, cartProduct],
        processing: [this.processingStatusObject],
        orderStatus: "started",
      });
    },
    addProductToCart() {
      if (!this.isInCart) {
        const orderObject = this.getOrderObject(this.productCartObject);
        this.setCartToLocalStorage(orderObject);
      }
      eventBus.$emit("cartVisibilityChange", true);
    },
    initWaypoint() {
      const waypointElements = document.querySelectorAll(".waypoint");
      waypointElements.forEach((waypointElement) => {
        new Waypoint({
          element: waypointElement,
          handler: function () {
            waypointElement.classList.add("waypoint-done");
          },
          offset: "80%",
        });
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
