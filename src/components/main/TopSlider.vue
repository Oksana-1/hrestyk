<template>
  <div class="main-slider-section">
    <carousel
      :perPage="1"
      :paginationEnabled="false"
      :autoplay="true"
      :loop="true"
      :autoplayTimeout="6000"
    >
      <slide v-for="(mainSlide, i) in getMslider" :key="i">
        <div class="slide-fix">
          <div
            class="slide-img"
            v-bind:style="{ backgroundImage: 'url(' + mainSlide.imgUrl + ')' }"
          ></div>
          <div class="slider-content">
            <div class="slider-title">{{ mainSlide.titleText }}</div>
            <div class="slider-btn-wrap">
              <router-link
                :to="'/catalog/'"
                class="hrestyk-btn-white hrestyk-btn-200"
                ><span>В магазин</span></router-link
              >
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
export default {
  components: {
    Carousel,
    Slide,
  },
  computed: {
    ...mapGetters(["getMslider"]),
  },
};
</script>