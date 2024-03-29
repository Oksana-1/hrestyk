import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./components/Main.vue";
import Catalog from "./components/Catalog.vue";
import ProductInner from "./components/ProductInner";
import Delivery from "./components/Delivery.vue";
import About from "./components/About.vue";
import Checkout from "./components/Checkout.vue";
import Thankyou from "./components/Thankyou.vue";

Vue.use(VueRouter);

export function createRouter() {
  return new VueRouter({
    routes: [
      { path: "", component: Main },
      { path: "/catalog", component: Catalog },
      { path: "/catalog/:id", component: ProductInner },
      { path: "/delivery", component: Delivery },
      { path: "/about", component: About },
      { path: "/checkout", component: Checkout },
      { path: "/thankyou", component: Thankyou },
      { path: "*", redirect: "/" }
    ],
    mode: "hash",
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0 };
    }
  });
}
