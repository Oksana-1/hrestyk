<template>
  <div class="main-content hr-content">
    <slot>
      <app-top-slider />
      <div class="product-slider-section">
        <spinner-cube v-if="busy" color="#fff" />
        <error-block v-else-if="error" :error="error" />
        <app-product-slider v-else />
      </div>
      <app-about-banner />
      <app-seo-text />
    </slot>
  </div>
</template>
<script>
import ProductSlider from "./main/ProductSlider.vue";
import TopSlider from "./main/TopSlider.vue";
import AboutBanner from "./main/AboutBanner";
import SeoText from "./main/SeoText";
import SpinnerCube from "@/components/ui/SpinnerCube";
import ErrorBlock from "@/components/ui/ErrorBlock";
import { mapActions } from "vuex";

export default {
  components: {
    appProductSlider: ProductSlider,
    appTopSlider: TopSlider,
    appAboutBanner: AboutBanner,
    appSeoText: SeoText,
    SpinnerCube,
    ErrorBlock
  },
  data() {
    return {
      busy: true,
      error: null
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    async init() {
      try {
        await this.fetchProducts();
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
