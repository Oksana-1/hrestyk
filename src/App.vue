<template>
  <div 
    class="main-wrap" 
    :class="contentClass"
  >
    <app-header />
    <transition 
      name="fade" 
      mode="out-in" 
    >
      <router-view :init-waypoint-prop="initWaypoint" />
    </transition>
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import {mapActions, mapMutations} from "vuex";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  data() {
    return {
      contentClass: "",
    };
  },
  watch: {
    $route(to) {
      switch (to.path) {
        case "/":
          this.contentClass = "main-page";
          break;
        case "/catalog":
          this.contentClass = "catalog-page";
          break;
        case "/about":
          this.contentClass = "about-page";
          break;
        case "/delivery":
          this.contentClass = "delivery-page";
          break;
        case "/checkout":
          this.contentClass = "checkout-page";
          break;
      }
      if (to.params.id) {
        this.contentClass = "catalog-inner-page";
      }
    },
  },
  methods: {
    ...mapMutations(["SET_CART_ID", "DISABLE_CART", "ENABLE_CART"]),
    ...mapActions(["getCart"]),
    initWaypoint() {
      let waypointElements = document.querySelectorAll(".waypoint");
      waypointElements.forEach(function (waypointElement) {
        new Waypoint({
          element: waypointElement,
          handler: function () {
            waypointElement.classList.add("waypoint-done");
          },
          offset: "80%",
        });
      });
    },
    async init() {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        this.SET_CART_ID(cartId);
        this.DISABLE_CART();
        try {
          await this.getCart(cartId);
        } catch (e) {
          console.error(e);
        } finally {
          this.ENABLE_CART();
        }
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    let mainWrap = document.querySelector(".main-wrap");
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 70) {
        mainWrap.classList.add("header-fixed");
      } else {
        mainWrap.classList.remove("header-fixed");
      }
    });
  },
};
</script>
<style lang="scss">
@import "./assets/css/main.scss";
</style>