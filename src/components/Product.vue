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
                            <div class="product-price">{{ productInfo.productPrice }} грн</div>
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
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {  
    data(){
        return{
            productId: this.$route.params.id
        }
    },
    computed:{
        ...mapGetters(['getProducts']),
    },
    watch: {
        '$route'(to, from){
            this.productId = to.params.id; 
        }
    },
    methods: {
       ...mapActions(['setFetchedProducts']),
       /*setData (err, post) {
            if (err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }*/
    },
    beforeRouteEnter (to, from, next) {
        console.log('beforeRouteEnter');
        //Have no access to this
        console.log(this);
        next();
        /*getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post))
        })*/
    },
    // when route changes and this component is already rendered,
    // the logic will be slightly different.
    beforeRouteUpdate (to, from, next) {
        console.log('beforeRouteUpdate');
         next();
        /*this.post = null
        getPost(to.params.id, (err, post) => {
        this.setData(err, post)
        next()
        });*/
    }
}
</script>

