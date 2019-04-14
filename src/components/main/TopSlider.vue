<template>
    <div class="main-slider-section">
        <div class="swiper-container mainSwiperInit">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(mainSlide, i) in getMslider" :key="i">
                    <div class="slide-fix">
                        <div class="slide-img" v-bind:style="{ 'backgroundImage': 'url(' + mainSlide.imgUrl + ')' }"></div>
                    </div>
                    <div class="slider-content">
                        <div class="slider-title">{{ mainSlide.titleText }}</div>
                        <div class="slider-btn-wrap">
                            <div class="hrestyk-btn-white hrestyk-btn-200"><span>Докладніше</span></div>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters(['getMslider'])
        },
        mounted(){
            let mainSwiper = new this.$swiper('.mainSwiperInit', { 
                speed: 400,
                loop: true,
                on: {
                    init: function () {
                        setTimeout(function(){
                            document.querySelector('.mainSwiperInit').style.opacity = 1;
                        },300);        
                    }
                }
            });
        }
    }
</script>

