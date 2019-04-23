<template>
    <div class="main-content">
        <slot>
            <app-top-slider :mainSlider="mainSlides"></app-top-slider>  
            <app-product-slider :productSlider="productSlides"></app-product-slider>
            <app-about-banner></app-about-banner>
            <app-seo-text></app-seo-text>
        </slot>
    </div>
</template>
<script>
import ProductSlider from './main/ProductSlider.vue';
import TopSlider from './main/TopSlider.vue';
import AboutBanner from './main/AboutBanner';
import SeoText from './main/SeoText';

export default {
    props: {
        initWaypointProp : {
            type : Function
        }
    },
    components:{
		appProductSlider: ProductSlider,
		appTopSlider: TopSlider,
		appAboutBanner: AboutBanner,
        appSeoText: SeoText
    },
    data: function(){
        return{
            mainSlides: [],
            productSlides: [
                { fileName: 'product1.jpg', link: '', shopId:'P8', name: 'Кулон "Сяйво".'},
                { fileName: 'product2.jpg', link: '', shopId:'S2', name: 'Набір "Сонце".'},
                { fileName: 'product3.jpg', link: '', shopId:'P11', name: 'Кулон "Квітка".'},
                { fileName: 'product4.jpg', link: '', shopId:'S3', name: 'Набір "Оберіг".'}
            ]
        }
    },
    mounted() {
        this.initWaypointProp();
    },
    updated() {
        this.initWaypointProp();
    }
}
</script>


