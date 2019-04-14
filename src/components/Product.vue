<template>
    <div class="product-content">
        <div class="c-box-1100">
            <h1 class="common-title">{{getProduct.productName}}. {{getProduct.productId}}</h1>
            <div class="c-cont">
                <div class="col-50">
                    <div class="product-inner-slider">
                        <div class="product-img-fix">
                            <div class="product-img"  v-bind:style="{ 'backgroundImage': 'url(' + getProduct.images.img1 + ')' }"></div>
                        </div>
                    </div>
                </div>
                 <div class="col-50">
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
</template>
<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {  
    data(){
        return{
            productId: this.$route.params.id
        }
    },
    watch: {
        '$route'(to, from){
            this.productId = to.params.id; 
        }
    },
    computed: {
        ...mapGetters(['getProduct']),
    },
    methods: {
       ...mapActions(['setProductById'])
    },
    created(){
        this.setProductById(this.productId);
    }
}
</script>

