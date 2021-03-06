<template>
  <div class="product-content hr-content">
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
            <div class="product-inner-slider">
              <div class="product-inner-mpic-fix">
                <div
                  class="product-inner-mpic mainPic"
                  :style="{ backgroundImage: `url(${mainImageUrl})` }"
                />
              </div>
              <div class="product-inner-thumb">
                <carousel
                  :perPage="3"
                  :paginationEnabled="false"
                  :navigationEnabled="true"
                >
                  <slide
                    v-for="productImage in product.images"
                    :key="productImage.id"
                  >
                    <div class="product-inner-thumb-slide productThumb">
                      <div class="product-img-fix">
                        <div
                          class="product-img"
                          :style="{
                            backgroundImage: `url(${productImage.url})`,
                          }"
                          @click="changeMainPic(productImage)"
                        />
                      </div>
                    </div>
                  </slide>
                </carousel>
              </div>
            </div>
          </div>
          <div class="col-50">
            <div class="col-inner col-product-desc">
              <div class="product-body">
                <div class="editor-content`" v-html="product.description" />
                <div class="product-info col-product-info">
                  <div class="buy-qnt-row">
                    <div class="input-qnt">
                      <label>
                        <input v-model.number="quantity">
                      </label>
                      <div class="input-qnt-ctrl">
                        <div class="input-qnt-up" @click="addOne"></div>
                        <div class="input-qnt-down" @click="minusOne"></div>
                      </div>
                    </div>
                    <div class="product-price">
                      {{ product.price }} грн
                    </div>
                    <button
                      class="hrestyk-btn-dark buyBtn"
                      :disabled="quantity <= 0 || !Number.isInteger(quantity)"
                      @click="addToCartProduct"
                    >
                      <span>Купити</span>
                    </button>
                  </div>
                </div>
                <div class="descr-note">
                  <p>
                    *Ми робимо все можливе, щоб показати справжні кольори на
                    своїх фотографіях. Але вони сильно залежать від освітлення,
                    і звичайно кольори можуть дещо відрізнятися на різних
                    моніторах.
                  </p>
                  <p>Будь ласка, майте це на увазі!</p>
                </div>
                <div class="sep-line-img">
                  <img
                    class="fits"
                    src="../assets/images/logo.png"
                    alt="Logo">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-about-banner />
  </div>
</template>
<script>
import eventBus from "../event-bus";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import AboutBanner from "./main/AboutBanner";
export default {
  props: {
    initWaypointProp: {
      type: Function,
    },
  },
  components: {
    Carousel,
    Slide,
    appAboutBanner: AboutBanner,
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
    };
  },
  watch: {
    $route(to) {
      this.productId = to.params.id;
    },
  },
  computed: {
    ...mapGetters(["product"]),
    mainImageUrl() {
      return this.product.images ? this.product.images[0].url : "";
    },
  },
  methods: {
    ...mapActions(["fetchSingleProduct"]),
    ...mapMutations(["ADD_TO_CARD"]),
    changeMainPic(imgSrc) {
      let mainPic = document.querySelector(".mainPic");
      mainPic.style.backgroundImage = "url(" + imgSrc + ")";
    },
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
    addToCartProduct() {
      const order = {
        productId: this.productId,
        quantity: this.quantity,
      };
      this.ADD_TO_CARD(order);
      this.quantity = 1;
      eventBus.$emit("cartVisibilityChange", true);
    },
    async init() {
      this.busy = true;
      try {
        await this.fetchSingleProduct(this.productId);
        this.initWaypointProp();
      } catch (e) {
        console.error(e);
      } finally {
        this.busy = false;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
