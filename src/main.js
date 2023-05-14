import Vue from "vue";
import Vuelidate from "vuelidate";
import Waypoint from "waypoints/lib/noframework.waypoints";
import VueCarousel from "vue-carousel";
import App from "./App.vue";
import eventBus from "./event-bus";
import { createRouter } from "./routes";
import { createStore } from "./store/store";

const router = createRouter();
router.beforeEach((to, from, next) => {
  eventBus.$emit("mobMenuVisibilityChange", false);
  document.querySelector("body").classList.remove("mobMenuOpened");
  next();
});

Vue.use(VueCarousel);
Vue.use(Vuelidate);

const store = createStore();

Object.defineProperty(Vue.prototype, "$waypoint", { value: Waypoint });

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
