<template>
    <div class="checkout-content">
       <div class="catalog-category-section">
            <div class="c-box-1100">
                <div class="catalog-category-container">
                    <h1 class="common-title">Оформлення замовлення</h1>
                </div>
            </div>
        </div>
        <div class="checkout-section">
            <div class="c-box-1100">
                <div class="c-cont">
                    <div class="col-50 col-form">
                        <div class="styled-form white-bkgnd-form styled-form-400">
                            <div class="cart-note">Будь ласка, заповніть форму, і наш менеджер зконтактує з Вами найближчого часу.</div>
                            <form>
                                <div class="input-row">
                                    <input type="text" placeholder="Ваше ім'я" v-model="checkoutFormData.name"/>
                                </div>
                                <div class="input-row">
                                    <input type="text" placeholder="Ваш email" v-model="checkoutFormData.email"/>
                                </div>
                                <div class="input-row">
                                    <input type="text" placeholder="Ваш телефон" v-model="checkoutFormData.phone"/>
                                </div>
                                <div class="input-row">
                                    <textarea placeholder="Ваші коментарі"  v-model="checkoutFormData.message"></textarea>
                                </div>
                                <div class="input-row">
                                    <button type="submit" @click.prevent="SEND_ORDER(checkoutFormData)">Відправити</button>
                                </div>
                            </form>
                        </div>
                        <div class="checkout-links-wrap">
                            <router-link to="/delivery">Умови оплати і доставки</router-link>
                        </div> 
                    </div>
                    <div class="col-50 col-cart">
                        <h2 class="small-title">Кошик</h2>                        
                        <div class="checkout-cart" v-if="getCart.length > 0">
                            <div class="cart-note-wrap">
                                <div class="cart-note">У Вашому кошику <span class="cart-qnt">{{getCart.length}}</span> {{itemString}}</div>
                                <router-link to="/catalog" class="hrestyk-btn-bordered-white">
                                    <div class="link-abs" @click="closeCart"></div>
                                    <span>Продовжити покупки</span>
                                </router-link>
                            </div>
                            <div class="checkout-cart-cont">
                                <div class="cart-item" v-for="(cartItem, i) in getCart" :key="i" >
                                    <div class="cart-item-img-fix">
                                        <router-link :to="'/catalog/' + cartItem.productId" class="link-abs"></router-link>
                                        <div class="cart-item-img"
                                        v-bind:style="{ 'backgroundImage': 'url(' + cartItem.mainImage + ')' }"></div>
                                    </div>
                                    <div class="cart-item-info">
                                        <router-link :to="'/catalog/' + cartItem.productId" class="cart-item-name">
                                            {{cartItem.productName}}
                                        </router-link>
                                        <div class="cart-price-row">
                                            <div class="input-qnt">
                                                <input
                                                v-model.number="cartItem.quantity"
                                                @keyup="changeQnt(cartItem.productId, cartItem.quantity)">
                                                <div class="input-qnt-ctrl">
                                                    <div class="input-qnt-up"
                                                    @click="changeQnt(cartItem.productId, cartItem.quantity + 1)"></div>
                                                    <div class="input-qnt-down"
                                                    @click="changeQnt(cartItem.productId, cartItem.quantity - 1)"></div>
                                                </div>
                                            </div>
                                            <div class="product-price">{{ cartItem.productPrice }} грн</div>
                                            <div class="item-summ">{{ cartItem.productPrice * cartItem.quantity }} грн</div>
                                            <div class="cart-item-del"
                                            @click="DELETE_ITEM(cartItem.productId)">+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-total-row">
                                <div class="total-sum">Загальна cума: <span class="total-num">{{getTotalSumm}} грн</span></div>
                            </div>
                        </div>
                        <div class="checkout-cart-empty" v-else>
                            <div class="cart-note-wrap">
                                <div class="cart-note">У Вашому кошику немає товарів</div>
                                <router-link to="/catalog" class="hrestyk-btn-bordered-white">
                                    <div class="link-abs" @click="closeCart"></div>
                                    <span>Повернутися в магазин</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventBus from '../event-bus';
import { mapGetters, mapMutations } from 'vuex';
export default {
     data(){
        return{
            checkoutFormData: {
                name: '',
                email: '',
                phone: '',
                message: ''
            }
        }
    },
    computed:{
        ...mapGetters(['getCart', 'getTotalSumm']),
        itemString(){
            let getCartLengthStr = this.getCart.length.toString();
            let singleNumExeptions = ['2', '3', '4'];
            let doubleNumExeptions = ['11', '12', '13', '14'];
            let lastChar = getCartLengthStr.substr(-1);
            let lastTwo = getCartLengthStr.substr(-2);
            if(doubleNumExeptions.indexOf(lastTwo) != -1){
                return 'товарів';
            }
            else{
                if( lastChar === '1'){
                    return 'товар';
                }
                else if( singleNumExeptions.indexOf(lastChar) != -1 ){
                    return 'товари';
                }
                else{
                    return 'товарів';
                }
            }
        }
    },
    methods:{
        ...mapMutations(['DELETE_ITEM', 'CHANGE_QNT' , 'SEND_ORDER']),
         changeQnt(id, qnt){
            const itemToChange = {
                itemId: id,
                itemQnt: qnt
            };
            this.CHANGE_QNT(itemToChange);
        },
        closeCart(){
            eventBus.$emit('cartVisibilityChange', false);
        }
    }
}
</script>

