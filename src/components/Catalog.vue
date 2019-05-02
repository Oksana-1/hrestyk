<template>
    <div class="catalog-content hr-content">
        <slot>
            <div class="catalog-category-section">
                <div class="c-box-1100">
                    <div class="catalog-category-container c-box-700">
                        <ul class="catalog-category-list">
                            <li :class="{active: currentCat==='all'}">
                                <a 
                                @click.prevent="filterOn = false, currentCat = 'all'" 
                                href="#">Всі товари</a>
                            </li>
                            <li 
                                v-for="(category, i) in getCategories" :key="i" 
                                :class="{active: currentCat===category}">
                                <a 
                                @click.prevent="filterCat(category), filterOn = true, currentCat = category"
                                href="#">
                                {{category}}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="catalog-products-section">
                <div class="c-box-1100">
                    <div class="catalog-products-container productContainer" v-if="!filterOn">
                        <app-product-card  v-for="(productItem, i) in getProducts" :key="i" :product="getProducts[i]"></app-product-card>
                    </div>
                     <div class="catalog-products-container" v-else>
                        <app-product-card  v-for="(productItem, i) in getfilteredProducts" :key="i" :product="getfilteredProducts[i]"></app-product-card>
                     </div>
                </div>
            </div>
        </slot>
    </div>
</template>
<script>
import productCard from './catalog/productCart';
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
    data(){
        return{
            filterOn: false,
            currentCat: 'all'
        }
    },
    props: {
        initWaypointProp : {
            type : Function
        }
    },
    components: {
        appProductCard: productCard
    } ,
    computed:{
        ...mapGetters(['getProducts' , 'getCategories', 'getfilteredProducts'])
    },
    methods:{
        ...mapMutations(['FILTER_CAT']),
        filterCat(category){
            this.FILTER_CAT(category);
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

