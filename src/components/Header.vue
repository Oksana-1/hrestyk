<template>
  <div
    class="hr-header-wrap"
    :class="{ mobMenuIsOpened: mobMenuIsOpened, cartIsShown: cartIsShown }"
  >
    <div class="pc-header">
      <div class="c-box-1100 hr-header-wrap">
        <div class="nav-cont">
          <div
            class="logo-fix"
            @click="navigateToHome()"
          >
            <img
              class="fits"
              src="../assets/images/logo.png"
              alt="Logo"
            >
          </div>
          <nav class="pc-nav">
            <ul>
              <router-link
                v-slot="{ href, navigate, isActive, isExactActive }"
                to="/"
                exact
                custom
              >
                <li :class="{ active: isActive }">
                  <a
                    :href="href"
                    @click="navigate"
                  >
                    {{ menu.main }}
                  </a>
                </li>
              </router-link>
              <router-link
                v-slot="{ href, navigate, isActive, isExactActive }"
                to="/catalog"
                custom
              >
                <li :class="{ active: isActive }">
                  <a
                    :href="href"
                    @click="navigate"
                  >
                    {{ menu.catalog }}
                  </a>
                </li>
              </router-link>
              <router-link
                v-slot="{ href, navigate, isActive, isExactActive }"
                to="/about"
                custom
              >
                <li :class="{ active: isActive }">
                  <a
                    :href="href"
                    @click="navigate"
                  >
                    {{ menu.about }}
                  </a>
                </li>
              </router-link>
              <router-link
                v-slot="{ href, navigate, isActive, isExactActive }"
                to="/delivery"
                custom
              >
                <li :class="{ active: isActive }">
                  <a
                    :href="href"
                    @click="navigate"
                  >
                    {{ menu.delivery }}
                  </a>
                </li>
              </router-link>
            </ul>
            <div class="social-cont social-cont-mobMenu">
              <a
                :href="social.fb"
                class="social-link"
              >
                <icon-base icon-name="fb"><icon-fb /></icon-base>
              </a>
              <a
                :href="social.ig"
                class="social-link"
              >
                <icon-base icon-name="ig"><icon-ig /></icon-base>
              </a>
              <a
                :href="social.twitter"
                class="social-link"
              >
                <icon-base icon-name="ig"><icon-twitter /></icon-base>
              </a>
            </div>
          </nav>
        </div>
        <div
          class="hr-sandwich-wrap"
          @click="mobMenuCtrl"
        >
          <button class="hr-sandwich" />
        </div>
        <div
          v-click-outside="closeEvent"
          class="hr-cart-wrap cartContainer"
          :class="{
            hiddenCart: !cartIsShown,
            cartIsEmpty: cartProducts.length === 0,
          }"
        >
          <button
            class="hr-cart-btn"
            @click="cartVisibilityCtrl"
          >
            <icon-base
              icon-name="cart"
              view-box="0 0 459.529 459.529"
              width="25"
              height="21"
            >
              <icon-cart />
            </icon-base>
          </button>
          <app-cart />
        </div>
      </div>
    </div>
    <div class="mob-overlay" />
  </div>
</template>
<script>
import eventBus from "../event-bus";
import IconBase from "../components/IconBase.vue";
import IconCart from "../components/icons/IconCart.vue";
import Cart from "../components/Cart.vue";
import IconFb from "../components/icons/IconFb.vue";
import IconIg from "../components/icons/IconIg.vue";
import IconTwitter from "../components/icons/IconTwitter.vue";
import { mapGetters } from "vuex";
import { menu } from "@/entities/data/navigation";
import { social } from "@/entities/data/socialLinks";

export default {
  components: {
    IconBase,
    IconCart,
    IconFb,
    IconIg,
    IconTwitter,
    appCart: Cart,
  },
  directives: {
    "click-outside": {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (
            !(
              el === event.target ||
              el.contains(event.target) ||
              event.target.closest(".buyBtn")
            )
          ) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  data() {
    return {
      cartIsShown: false,
      mobMenuIsOpened: false,
      menu,
      social,
    };
  },
  computed: {
    ...mapGetters(["cartProducts"]),
  },
  created() {
    eventBus.$on("cartVisibilityChange", (cartIsShown) => {
      this.cartIsShown = cartIsShown;
    });
    eventBus.$on("mobMenuVisibilityChange", (mobMenuIsOpened) => {
      this.mobMenuIsOpened = mobMenuIsOpened;
    });
  },
  methods: {
    navigateToHome() {
      this.$router.push({ path: "/" });
    },
    cartVisibilityCtrl() {
      this.cartIsShown = !this.cartIsShown;
    },
    closeEvent() {
      this.cartIsShown = false;
      eventBus.$emit("cartVisibilityChange", false);
    },
    mobMenuCtrl() {
      this.mobMenuIsOpened = !this.mobMenuIsOpened;
      eventBus.$emit("mobMenuVisibilityChange", this.mobMenuIsOpened);
      document.querySelector("body").classList.toggle("mobMenuOpened");
    },
  },
};
</script>
