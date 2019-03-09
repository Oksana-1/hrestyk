<template>
    <div class="product-content">
        <h1>Inner page for product</h1>
        <div class="product-card-wrap">
            <div class="product-card-inner">
                <div class="product-img-fix">
                    <div class="product-img" style="background-image: url('../../src/assets/images/files/product1.jpg');"></div>
                </div>
                <div class="product-info product-info-test">
                    <div class="product-name">{{productId}}</div>
                    <div class="buy-btn-row">
                        <div class="product-price">150 грн</div>
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
            productId: this.$route.params.id               
        }
    },
    watch: {
        '$route'(to, from){
            this.productId = to.params.id; 
        }

    }
}
</script>

