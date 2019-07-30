<template>
    <div class="product-slider-section waypoint">
        <div class="c-box-1100">
            <div class="common-title">Товари</div>
        </div>
        <div class="product-slider-wrap">
            <carousel :perPage=1 :perPageCustom="[[768, 2],  [1024, 3]]" :scrollPerPage="false" :paginationEnabled="false" :navigationEnabled="true"> 
                <slide v-for="(productSlide, i) in getpSlider" :key="i" class="product-slide">
                    <div class="slide-fix animate opacity from-down">
                        <div class="slide-img" v-bind:style="{ 'backgroundImage': 'url(' + productSlide.toMainImage + ')' }"></div>
                        <div class="hidden-block">
                            <div class="product-name">{{productSlide.productName}} {{productSlide.productId}}</div>
                            <router-link :to="'/catalog/' + productSlide.productId" class="product-more">Детальніше</router-link>
                        </div>
                    </div>
                </slide>
                <slide v-if="windowWidth > 767" class="product-slide"></slide>
            </carousel>
        </div>
     
        <div class="hrestyk-btn-wrap waypoint">
            <router-link :to="'/catalog/'" class="hrestyk-btn-dark hrestyk-btn-200 animate opacity"><span>Всі товари</span></router-link>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
export default {
    components:{
        Carousel,
        Slide
    },
    computed: {
        ...mapGetters(['getpSlider']),
        windowWidth(){
            return window.innerWidth;
        }
    }
}
</script>

