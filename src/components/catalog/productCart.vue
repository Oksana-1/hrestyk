<template>
    <div class="product-card-wrap waypoint">
        <router-link :to="'/catalog/' + product.productId" class="link-abs"></router-link>
        <div class="product-card-inner animate opacity">
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
import { mapMutations } from 'vuex';
import eventBus from '../../event-bus';
export default {
    props: {
        product: {
            type: Object
        }
    },
     methods: {
        ...mapMutations(['ADD_TO_CARD']),
         addToCartProduct(){
            const order = {
                productId: this.product.productId,
                quantity: 1
            };
            this.ADD_TO_CARD(order);
            eventBus.$emit('cartVisibilityChange', true);
        }
    }
}
</script>

