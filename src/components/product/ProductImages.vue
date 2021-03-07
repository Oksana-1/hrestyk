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
        :per-page="3"
        :pagination-enabled="false"
        :navigation-enabled="true"
      >
        <slide
          v-for="productImage in product.images"
          :key="productImage.id"
        >
          <div class="product-inner-thumb-slide productThumb">
            <div class="product-img-fix">
              <div
                class="product-img"
                :style="{
                  backgroundImage: `url(${productImage.url})`,
                }"
                @click="changeMainImage(productImage.id)"
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
  data() {
    return {
      mainImage: null
    }
  },
  computed: {
    ...mapGetters(["product"]),
    mainImageUrl() {
      if (!this.mainImage || !this.product.images) return '';
      return this.mainImage ? this.mainImage.url : this.product.images[0].url;
    },
  },
  methods: {
    setDefaultMainImage() {
      if (!this.product.images) return;
      this.mainImage = this.product.images.find(image => image.is_main) || null;
    },
    changeMainImage(imageId) {
      this.mainImage = this.product.images.find(image => image.id === imageId) || null;
    },
  },
  created() {
    this.setDefaultMainImage();
  }
};
</script>

<style scoped></style>
