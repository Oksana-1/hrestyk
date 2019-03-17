<template>
    <div class="product-content">
        <h1>{{productInfo.productName}}. {{productInfo.productId}}</h1>
        <div class="product-card-wrap">
            <div class="product-card-inner">
                <div class="product-img-fix">
                    <div class="product-img"  v-bind:style="{ 'backgroundImage': 'url(' + productInfo.images.img1 + ')' }"></div>
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

