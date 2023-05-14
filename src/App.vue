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
      <router-view />
    </transition>
    <app-footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { mapActions } from "vuex";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  data() {
    return {
      contentClass: ""
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
    }
  },
  methods: {
    ...mapActions(["getCartFromLocalStorage"]),
    initLocal() {
      this.getCartFromLocalStorage();
    }
  },
  created() {
    this.initLocal();
  },
  mounted() {
    let mainWrap = document.querySelector(".main-wrap");
    window.addEventListener("scroll", function() {
      if (window.pageYOffset > 70) {
        mainWrap.classList.add("header-fixed");
      } else {
        mainWrap.classList.remove("header-fixed");
      }
    });
  }
};
</script>
<style lang="scss">
@import "./assets/css/main.scss";
</style>
