<template>
  <div class="product-content hr-content">
    <spinner-cube v-if="busy" />
    <error-block v-else-if="error" :error="error" />
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
                    <div class="editor-content`" v-html="product.description" />
                    <div class="product-info col-product-info">
                      <div class="buy-qnt-row">
                        <div class="input-qnt">
                          <label>
                            <input
                              v-model.number="quantity"
                              :disabled="isInCart"
                            />
                          </label>
                          <div class="input-qnt-ctrl">
                            <button
                              class="input-qnt-up"
                              :disabled="isInCart"
                              @click="addOne"
                            />
                            <button
                              class="input-qnt-down"
                              :disabled="isInCart"
                              @click="minusOne"
                            />
                          </div>
                        </div>
                        <div class="product-price">{{ product.price }} грн</div>
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
                    <div class="descr-note" v-html="warnings.colorMismatch" />
                    <div class="sep-line-img">
                      <img
                        class="fits"
                        src="@/assets/images/logo.png"
                        alt="Logo"
                      />
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
import { btnText } from "@/entities/data/btnTexts";
import { warnings } from "@/entities/data/warnings";
import ErrorBlock from "@/components/ui/ErrorBlock";

export default {
  name: "ProductInner",
  components: {
    ProductImages,
    AboutBanner,
    SpinnerCube,
    ErrorBlock
  },
  data() {
    return {
      productId: this.$route.params.id,
      productSliderOptions: {
        init: false,
        loop: true,
        width: 150,
        spaceBetween: 10,
        slidesPerView: 3
      },
      quantity: 1,
      busy: false,
      btnText,
      warnings,
      error: null
    };
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
    cartProduct() {
      this.setProductAmount();
    }
  },
  computed: {
    ...mapGetters(["product", "cartProducts"]),
    cartProduct() {
      return this.cartProducts.find(item => item.id === this.productId);
    },
    isInCart() {
      return Boolean(this.cartProduct);
    }
  },
  methods: {
    ...mapActions(["fetchSingleProduct", "addItemToCartProducts"]),
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
    setProductAmount() {
      this.quantity = this.cartProduct ? this.cartProduct.amount : 1;
    },
    async init() {
      this.busy = true;
      try {
        await this.fetchSingleProduct(this.productId);
        this.setProductAmount();
      } catch (e) {
        this.error = e;
        console.error(e);
      } finally {
        this.busy = false;
        requestAnimationFrame(() => {
          this.initWaypoint();
        });
      }
    },
    addProductToCart() {
      if (!this.isInCart) {
        this.addItemToCartProducts({
          productId: this.productId,
          amount: this.quantity
        });
      }
      eventBus.$emit("cartVisibilityChange", true);
    },
    initWaypoint() {
      const waypointElements = document.querySelectorAll(".waypoint");
      waypointElements.forEach(waypointElement => {
        new Waypoint({
          element: waypointElement,
          handler: function() {
            waypointElement.classList.add("waypoint-done");
          },
          offset: "80%"
        });
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
