<template>
    <div class="checkout-content hr-content">
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
                            <form :class="{'form-disabled' : getCart.length < 1}">
                                <div class="input-row" :class="{invalid: $v.name.$error}">
                                    <input 
                                        type="text" 
                                        placeholder="Ваше ім'я" 
                                        @blur="$v.name.$touch()"
                                        v-model="name"/>
                                        <p v-if="!$v.name.required && $v.name.$dirty" class="invalid-message">{{formErrors.empty}}
                                        </p>
                                </div>
                                <div class="input-row" :class="{invalid: $v.email.$error}">
                                    <input 
                                        type="text" 
                                        placeholder="Ваш email" 
                                        @blur="$v.email.$touch()"
                                        v-model="email"/>
                                    <p v-if="!$v.email.email" class="invalid-message">{{formErrors.invalidEmail}}</p>
                                    <p v-if="!$v.email.required && $v.email.$dirty" class="invalid-message">{{formErrors.empty}}
                                    </p>
                                </div>
                                <div class="input-row" :class="{invalid: $v.phone.$error}">
                                    <input 
                                        type="text" 
                                        placeholder="Ваш телефон" 
                                        @blur="$v.phone.$touch()"
                                        v-model="phone"/>
                                    <p v-if="!$v.phone.numeric || !$v.phone.minLength" class="invalid-message">{{formErrors.invalidPhonel}}</p>
                                    <p v-if="!$v.phone.required && $v.phone.$dirty" class="invalid-message">{{formErrors.empty}}</p>
                                </div>
                                <div class="input-row">
                                    <textarea placeholder="Ваші коментарі"  v-model="message"></textarea>
                                </div>
                                <div class="input-row">
                                    <button type="submit" 
                                    :disabled="getCart.length < 1"
                                    @click.prevent="sendOrder(), $v.$touch()">Відправити</button>
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
import { required, email, numeric, minLength } from 'vuelidate/lib/validators';
export default {
     data(){
        return{
            name: '',
            email: '',
            phone: '',
            message: '',
            formErrors: {
                invalidEmail: 'Будь-ласка, введіть корректний email.',
                invalidPhonel: 'Будь-ласка, введіть корректний телефон',
                empty: 'Це поле обов\'язкове.'
            }
        }
    },
    validations: {
        email: {
            required,
            email
        },
        phone: {
            required, 
            numeric,
            minLength: minLength(10)
        },
        name: {
            required
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
        },
        sendOrder(){
            const checkoutFormData = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                message: this.message
            }
            if(!this.$v.$invalid){
                this.SEND_ORDER(checkoutFormData);
            }
        }
    }
}
</script>

