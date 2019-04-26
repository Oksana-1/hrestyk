<template>
    <div class="product-card-wrap">
        <router-link :to="'/catalog/' + product.productId" class="link-abs"></router-link>
        <div class="product-card-inner">
            <div class="product-img-fix">
                <div class="product-img" v-bind:style="{ 'backgroundImage': 'url(' + product.mainImage + ')' }"></div>
            </div>
            <div class="product-info">
                <div class="product-name">{{ product.productName }}. {{ product.productId }}.</div>
                <div class="buy-btn-row">
                    <div class="product-price">{{ product.productPrice }} грн</div>
                    <button class="hrestyk-btn-dark"
                    @click="addToCartProduct()">
                        <span>Купити</span>
                    </button>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: {
        product: {
            type: Object
        }
    },
     methods: {
        ...mapActions(['addToCart']),
         addToCartProduct(){
            const order = {
                productId: this.product.productId,
                quantity: 1
            };
            this.addToCart(order);
       }
    }
}
</script>

