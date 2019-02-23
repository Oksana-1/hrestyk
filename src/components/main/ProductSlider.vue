<template>
    <div class="product-slider-section waypoint">
        <div class="c-box-1100">
            <div class="common-title">Товари</div>
        </div>
        <div class="swiper-container productSwiperInit">
            <div class="swiper-wrapper">
                <div class="swiper-slide product-slide" v-for="(productSlide, i) in productSlider" :key="i">
                    <div class="slide-fix animate opacity from-down">
                        <a href="#" class="link-abs"></a>
                        <div class="slide-img" v-bind:style="{ 'backgroundImage': 'url(src/assets/images/files/' + productSlide.fileName + ')' }"></div>
                        <div class="hidden-block">
                            <div class="product-name">{{productSlide.name}} {{productSlide.shopId}}</div>
                            <div class="product-more">Детальніше</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hrestyk-btn-wrap waypoint">
            <a href="#" class="hrestyk-btn-dark hrestyk-btn-200 animate opacity"><span>Всі товари</span></a>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        productSlider:{
            type: Array
        }
    },
    mounted(){   
        let productSwiper = new this.$swiper('.productSwiperInit', {
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true,
            loop: true,
            pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
            on: {
                init: function () {
                    setTimeout(function(){
                        document.querySelector('.productSwiperInit').style.opacity = 1;
                    },300);        
                }
            }
        });
    }
}
</script>

