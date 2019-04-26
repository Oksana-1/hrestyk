<template>
    <div class="hr-cart-content">
        <div class="hr-cart-content-inner">
            <div class="cart-info" v-if="getCart.length === 0">
                <div class="cart-title">Ваша корзина пуста</div>
                <router-link to="/catalog" class="hrestyk-btn-dark"><span>В каталог</span></router-link>
            </div>
            <div class="cart-product" v-else>
               <div class="cart-item" v-for="(cartItem, i) in getCart" :key="i" >
                   <div class="cart-item-img-fix">
                       <div class="cart-item-img"
                       v-bind:style="{ 'backgroundImage': 'url(' + cartItem.mainImage + ')' }"></div>
                   </div>
                   <div class="cart-item-info">
                        <div class="cart-item-name">{{cartItem.productName}}</div>
                        <div class="cart-price-row">
                            <div class="input-qnt">
                                <input
                                v-model.number="cartItem.quantity">
                                <div class="input-qnt-ctrl">
                                    <div class="input-qnt-up"
                                    @click="addOneToCart(cartItem.productId)"></div>
                                    <div class="input-qnt-down"
                                    @click="removeOneFromCart(cartItem.productId)"></div>
                                </div>
                            </div>
                            <div class="product-price">{{ cartItem.productPrice }} грн</div>
                            <div class="cart-item-del"
                            @click="deleteItemFromCart(cartItem.productId)">+</div>
                        </div>
                   </div>
               </div>
               <div class="card-total-row">
                    <div class="total-sum">Загальна cума: <span class="total-num">{{getTotal}} грн</span></div>
                    <router-link to="/catalog" class="hrestyk-btn-dark"><span>Оформити замовлення</span></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
    computed:{
        ...mapGetters(['getCart', 'getTotal'])
    },
    methods:{
        ...mapActions(['deleteItem', 'addOne', 'removeOne']),
        deleteItemFromCart(productId){
            this.deleteItem(productId);
        },
        addOneToCart(productId){
            this.addOne(productId);
        },
        removeOneFromCart(productId){
            this.removeOne(productId);
        }
    }
}
</script>
