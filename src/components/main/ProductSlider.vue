<template>
    <div class="product-slider-section waypoint">
        <div class="c-box-1100">
            <div class="common-title">Товари</div>
        </div>
        <div class="product-slider-wrap">
            <carousel :perPage="3" :paginationEnabled="false">
                <slide v-for="(productSlide, i) in productSlider" :key="i" class="product-slide">
                    <div class="slide-fix animate opacity from-down">
                        <a href="#" class="link-abs"></a>
                        <div class="slide-img" v-bind:style="{ 'backgroundImage': 'url(src/assets/images/files/' + productSlide.fileName + ')' }"></div>
                        <div class="hidden-block">
                            <div class="product-name">{{productSlide.name}} {{productSlide.shopId}}</div>
                            <div class="product-more">Детальніше</div>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
     
        <div class="hrestyk-btn-wrap waypoint">
            <a href="#" class="hrestyk-btn-dark hrestyk-btn-200 animate opacity"><span>Всі товари</span></a>
        </div>
    </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
    components:{
        Carousel,
        Slide
    },
    props:{
        productSlider:{
            type: Array
        }
    }
}
</script>

