<template>
    <div class="main-slider-section">
        <div class="swiper-container mainSwiperInit">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(mainSlide, i) in mainSlider" :key="i">
                    <div class="slide-fix">
                        <div class="slide-img" v-bind:style="{ 'backgroundImage': 'url(src/assets/images/files/' + mainSlide.fileName + ')' }"></div>
                    </div>
                </div>
            </div>           
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            mainSlider: {
                type: Array
            }
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

