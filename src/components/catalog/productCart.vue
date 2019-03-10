<template>
    <div class="product-card-wrap">
        <router-link :to="'/catalog/' + product.productId" class="link-abs"></router-link>
        <div class="product-card-inner">
            <div class="product-img-fix">
                <div class="product-img" v-bind:style="{ 'backgroundImage': 'url(' + product.images.img1 + ')' }"></div>
            </div>
            <div class="product-info product-info-test">
                <div class="product-name">{{ product.productName }}. {{ product.productId }}.</div>
                <div class="buy-btn-row">
                    <div class="product-price">{{ product.productPrice }} грн</div>
                    <a href="#" class="hrestyk-btn-dark">
                        <span>Купити</span>
                    </a>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
export default {
    props: {
        product: {
            type: Object
        }
    }
}
</script>

