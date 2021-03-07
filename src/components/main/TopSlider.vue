<template>
  <div class="main-slider-section">
    <carousel
      :per-page="1"
      :pagination-enabled="false"
      :autoplay="true"
      :loop="true"
      :autoplay-timeout="6000"
    >
      <slide
        v-for="(mainSlide, index) in mainSliderImages"
        :key="`main-slider-${index}`"
      >
        <div class="slide-fix">
          <div
            class="slide-img"
            :style="{backgroundImage: `url('${require('../../assets/images/mainSlider/' + mainSlide.filename)}')`}"
          />
          <div class="slider-content">
            <div class="slider-title">
              {{ mainSlide.title }}
            </div>
            <div class="slider-btn-wrap">
              <router-link
                :to="'/catalog/'"
                class="hrestyk-btn-white hrestyk-btn-200"
              >
                <span>В магазин</span>
              </router-link>
            </div>
          </div>
        </div>
      </slide>
    </carousel>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Carousel, Slide } from "vue-carousel";
import {mainSliderImages} from "@/entities/data/mainSliderImages";

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      mainSliderImages
    }
  },
  computed: {
    ...mapGetters(["getMslider"]),
  },
};
</script>