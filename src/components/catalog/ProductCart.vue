<template>
  <div class="product-card-wrap waypoint">
    <router-link
      :to="'/catalog/' + product.id"
      class="link-abs"
    />
    <div class="product-card-inner animate opacity">
      <div class="product-img-fix">
        <div
          v-if="mainImageUrl"
          class="product-img"
          :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"
        />
        <icon-base
          v-else
          class="product-img no-image"
          height="200"
          width="200"
          view-box="41.64 164.945 512 512"
        >
          <icon-no-image />
        </icon-base>
      </div>
      <div class="product-info">
        <div class="product-name">
          {{ product.title }}.
        </div>
        <div class="buy-btn-row">
          <div class="product-price">
            {{ `${product.price} ${currency.UAH}` }}
          </div>
          <button
            class="hrestyk-btn-dark buyBtn"
            @click="addProductToCart"
          >
            <span v-if="!isInCart">{{ btnText.buy }}</span>
            <span v-else>{{ btnText.alreadyInCart }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Product from "@/entities/Product";
import IconBase from "@/components/IconBase";
import IconNoImage from "@/components/icons/IconNoImage";
import { mapGetters } from "vuex";
import eventBus from "@/event-bus";
import { btnText } from "@/entities/data/btnTexts";
import { currency } from "@/entities/data/currency";

export default {
  props: {
    product: Product
  },
  components: {
    IconBase,
    IconNoImage
  },
  data() {
    return {
      btnText,
      currency
    };
  },
  computed: {
    ...mapGetters(["cartProducts"]),
    mainImageUrl() {
      if (this.product.images.length === 0) return "";
      const mainImage = this.product.images.find(image => image.is_main);
      return mainImage ? mainImage.url : this.product.images[0].url;
    },
    isInCart() {
      return Boolean(
        this.cartProducts.find(item => item._id === this.product.id)
      );
    }
  },
  methods: {
    addProductToCart() {
      if (!this.isInCart) {
        this.$emit("addProductToCart", this.product.id);
      }
      eventBus.$emit("cartVisibilityChange", true);
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
    this.initWaypoint();
  }
};
</script>
