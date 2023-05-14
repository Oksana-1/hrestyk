<template>
  <div class="main-content hr-content">
    <slot>
      <app-top-slider />
      <app-product-slider v-if="!busy" />
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
import { mapActions } from "vuex";

export default {
  components: {
    appProductSlider: ProductSlider,
    appTopSlider: TopSlider,
    appAboutBanner: AboutBanner,
    appSeoText: SeoText
  },
  data() {
    return {
      busy: true
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    async init() {
      try {
        await this.fetchProducts();
      } catch (e) {
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
