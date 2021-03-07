<template>
  <div class="product-inner-slider">
    <div class="product-inner-mpic-fix">
      <div
        class="product-inner-mpic mainPic"
        :style="{ backgroundImage: `url(${mainImageUrl})` }"
      />
    </div>
    <div class="product-inner-thumb">
      <carousel
        :perPage="3"
        :paginationEnabled="false"
        :navigationEnabled="true"
      >
        <slide v-for="productImage in product.images" :key="productImage.id">
          <div class="product-inner-thumb-slide productThumb">
            <div class="product-img-fix">
              <div
                class="product-img"
                :style="{
                  backgroundImage: `url(${productImage.url})`,
                }"
                @click="changeMainPic(productImage)"
              />
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";

export default {
  name: "ProductImages",
  components: {
    Carousel,
    Slide,
  },
  computed: {
    ...mapGetters(["product"]),
    mainImageUrl() {
      return this.product.images ? this.product.images[0].url : "";
    },
  },
  methods: {
    changeMainPic(imgSrc) {
      let mainPic = document.querySelector(".mainPic");
      mainPic.style.backgroundImage = "url(" + imgSrc + ")";
    },
  },
};
</script>

<style scoped></style>
