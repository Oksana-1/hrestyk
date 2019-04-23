<template>
    <div class="product-content">
        <div class="c-box-1100">
            <div class="c-cont">
                <div class="col-50">
                    <div class="product-inner-slider">
                        <div class="product-inner-mpic-fix">
                            <div class="product-inner-mpic mainPic" 
                            v-bind:style="{ 'backgroundImage': 'url(' + getProduct.mainImage + ')' }"></div>
                        </div>
                        <div class="product-inner-thumb">
                            <carousel :perPage="3" :paginationEnabled="false" :navigationEnabled="true">
                                <slide v-for="(productImage, i) in getProduct.images" :key="i">
                                    <div class="product-inner-thumb-slide">
                                        <div class="product-img-fix">
                                            <div class="product-img" 
                                            v-bind:style="{ 'backgroundImage': 'url(' + productImage + ')' }"
                                            @click="changeMainPic(productImage)"
                                            ></div>
                                        </div>
                                    </div>
                                </slide>
                            </carousel>
                        </div>
                    </div>
                </div>
                 <div class="col-50">
                     <div class="col-inner col-product-desc">
                         <h1 class="common-title">{{getProduct.productName}}. {{getProduct.productId}}</h1>
                        <div class="editor-container" v-html="getProduct.productDescr">
                            {{getProduct.productDescr}}   
                        </div>
                        <div class="descr-note">
                            <p>Ми робимо все можливе, щоб показати справжні кольори на своїх фотографіях. 
                            Але вони сильно залежать від освітлення, і звичайно кольори можуть дещо відрізнятися на різних моніторах.</p>
                            <p>Будь ласка, майте це на увазі!</p>
                        </div>
                        <div class="product-info product-info-test">
                            <div class="buy-btn-row">
                                <div class="product-price">{{ getProduct.productPrice }} грн</div>
                                <a href="#" class="hrestyk-btn-dark">
                                    <span>Купити</span>
                                </a>
                            </div>
                        </div> 
                     </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
export default { 
    components:{
        Carousel,
        Slide
    }, 
    data(){
        return{
            productId: this.$route.params.id,
            productSliderOptions: {
                init: false,
                loop: true,
                width: 150,
                spaceBetween: 10,
                slidesPerView: 3
            }
        }
    },
    watch: {
        '$route'(to, from){
            this.productId = to.params.id; 
        }
    },
    computed: {
        ...mapGetters(['getProduct'])
    },
    methods: {
       ...mapActions(['setProductById']),
       changeMainPic(imgSrc){
           let mainPic = document.querySelector('.mainPic');
           mainPic.style.backgroundImage = 'url(' + imgSrc + ')';
       }
    },
    created(){
        this.setProductById(this.productId);
    }
}
</script>

