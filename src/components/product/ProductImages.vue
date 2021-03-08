<template>
  <div class="product-inner-slider">
    <div class="product-inner-mpic-fix">
      <div
        v-if="mainImageUrl"
        class="product-inner-mpic mainPic"
        :style="{ backgroundImage: `url(${mainImageUrl})` }"
      />
      <icon-base
        v-else
        class="product-inner-mpic no-image"
        height="200"
        width="200"
        view-box="41.64 164.945 512 512"
      >
        <icon-no-image />
      </icon-base>
    </div>
    <div class="product-inner-thumb">
      <carousel
        v-if="product.images.length > 0"
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
      <div
        v-else
        class="show-from-tablet-big"
      >
        <div class="product-img-fix">
          <icon-base
            class="product-img no-image"
            height="200"
            width="200"
            view-box="41.64 164.945 512 512"
          >
            <icon-no-image />
          </icon-base>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import { mapGetters } from "vuex";
import IconBase from "@/components/IconBase";
import IconNoImage from "@/components/icons/IconNoImage";

export default {
  name: "ProductImages",
  components: {
    Carousel,
    Slide,
    IconBase,
    IconNoImage
  },
  data() {
    return {
      mainImage: null
    }
  },
  computed: {
    ...mapGetters(["product"]),
    mainImageUrl() {
      if (this.product.images.length === 0) return '';
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
