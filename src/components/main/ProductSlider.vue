<template>
  <div class="product-slider-section waypoint">
    <div class="c-box-1100">
      <div class="common-title">
        {{ headerTexts.mainProductSlider }}
      </div>
    </div>
    <div class="product-slider-wrap">
      <carousel
        :per-page="1"
        :per-page-custom="[
          [768, 2],
          [1024, 3]
        ]"
        :scroll-per-page="false"
        :pagination-enabled="false"
        :navigation-enabled="true"
      >
        <slide
          v-for="(product, index) in productWithImages"
          :key="`product-slide-${index}`"
          class="product-slide"
        >
          <div class="slide-fix animate opacity from-down">
            <div
              class="slide-img"
              :style="{ backgroundImage: `url(${product.images[0].url})` }"
            />
            <div class="hidden-block">
              <div class="product-name">
                {{ product.title }}
              </div>
              <router-link
                :to="'/catalog/' + product.id"
                class="product-more"
              >
                {{ btnText.detailed }}
              </router-link>
            </div>
          </div>
        </slide>
        <slide
          v-if="windowWidth > 767"
          class="product-slide"
        />
      </carousel>
    </div>

    <div class="hrestyk-btn-wrap waypoint">
      <router-link
        :to="'/catalog/'"
        class="hrestyk-btn-dark hrestyk-btn-200 animate opacity"
      >
        <span>
          {{ btnText.allGoods }}
        </span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import { btnText } from "@/entities/data/btnTexts";
import { headerTexts } from "@/entities/data/texts";

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      btnText,
      headerTexts
    };
  },
  computed: {
    ...mapGetters(["products"]),
    windowWidth() {
      return window.innerWidth;
    },
    productWithImages() {
      return this.products.filter(item => item.images.length > 0);
    }
  }
};
</script>
