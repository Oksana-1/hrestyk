<template>
    <div class="product-content">
        <div class="c-box-1100">
            <h1 class="common-title">{{productInfo.productName}}. {{productInfo.productId}}</h1>
            <div class="c-cont">
                <div class="col-50">
                    <div class="product-inner-slider">
                        <div class="product-img-fix">
                            <div class="product-img"  v-bind:style="{ 'backgroundImage': 'url(' + productInfo.images.img1 + ')' }"></div>
                        </div>
                    </div>
                </div>
                 <div class="col-50">
                     <div class="editor-container" v-html="productInfo.productDescr">
                         {{productInfo.productDescr}}   
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
export default {
    data(){
        return{
            productId: this.$route.params.id,
            productInfo: {}        
        }
    },
    watch: {
        '$route'(to, from){
            this.productId = to.params.id; 
        }

    },
    methods: {
        fetchData(){
            this.$http.get('')
            .then(response =>{
                return response.json();
            }, error =>{
                console.log(error);
            })
            .then(data => {
                for(let key in data.products){
                    if(this.productId === data.products[key].productId){
                        this.productInfo = data.products[key];
                    }
                }
                
            });
        }
    },
    created(){
        this.fetchData();
    }
}
</script>

