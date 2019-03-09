<template>
    <div class="catalog-content">
        <slot>
            <div class="catalog-category-section">
                <div class="c-box-1100">
                    <div class="catalog-category-container c-box-700">
                        <ul class="catalog-category-list">
                            <li class="active"><a href="#">Всі товари</a></li>
                            <li><a href="#">Картини</a></li>
                            <li><a href="#">Гольниці</a></li>
                            <li><a href="#">Брошки</a></li>
                            <li><a href="#">Сережки</a></li>
                            <li><a href="#">Кулони</a></li>
                            <li><a href="#">Набори</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="catalog-products-section">
                <div class="c-box-1100">
                    <div class="catalog-products-container">
                        <app-product-card  v-for="(productItem, i) in productInfo" :key="i" :product="productInfo[i]"></app-product-card>
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>
<script>
import productCard from './catalog/productCart';
export default {
    components: {
        appProductCard: productCard
    } ,
    data(){
        return {
            productInfo: []
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
                const productArray = [];
                for(let key in data.products){
                    productArray.push(data.products[key]);
                }
                this.productInfo = productArray;
            });
        }
    },
    created(){
        this.fetchData();
    }
}
</script>

