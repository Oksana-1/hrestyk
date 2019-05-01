<template>
    <div class="main-content hr-content">
        <slot>
            <app-top-slider></app-top-slider>  
            <app-product-slider></app-product-slider>
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
    mounted() {
        this.initWaypointProp();
    },
    updated() {
        this.initWaypointProp();
    }
}
</script>


