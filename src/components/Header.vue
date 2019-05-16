<template>
    <div class="hr-header-wrap">
        <div class="pc-header">
            <div class="c-box-1100 hr-header-wrap">
                <div class="nav-cont">
                    <div class="hr-sandwich-wrap">
                        <button class="hr-sandwich"  @click="showMobMenu()">
                        </button>
                    </div>
                    <div @click="navigateToHome()" class="logo-fix">
                        <img class="fits" src="../assets/images/logo.png" alt="Logo"/>
                    </div>
                    <nav class="pc-nav">
                        <ul>
                            <router-link to="/" tag="li" active-class="active" exact><a>Головна</a></router-link>
                            <router-link to="/catalog" tag="li" active-class="active" exact><a>Каталог</a></router-link>
                            <router-link to="/about" tag="li" active-class="active" exact><a>Про нас</a></router-link>
                            <router-link to="/delivery" tag="li" active-class="active" exact><a>Оплата та доставка</a></router-link>
                        </ul>
                    </nav>
                </div>
                <div class="hr-cart-wrap cartContainer"
                    :class="{ hiddenCart: !cartIsShown, cartIsEmpty: getCart.length === 0 }"
                    v-click-outside="closeEvent">
                    <button class="hr-cart-btn"
                        @click="cartVisibilityCtrl">
                        <icon-base icon-name="cart" view-box="0 0 459.529 459.529" width="25" height="21"><icon-cart /></icon-base>
                    </button>
                    <app-cart></app-cart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventBus from '../event-bus';
import IconBase from '../components/IconBase.vue';
import IconCart from '../components/icons/IconCart.vue';
import Cart from '../components/Cart.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
            IconBase,
            IconCart,
            appCart : Cart
    },
    data(){
        return {
            cartIsShown: false
        }
    },
    computed: {
        ...mapGetters(['getCart'])
    },
    methods: {
        navigateToHome(){
            this.$router.push({path: '/'});
        },
        cartVisibilityCtrl(){
            this.cartIsShown = this.cartIsShown === false?true:false;
        },
        closeEvent() {
            this.cartIsShown = false;
            eventBus.$emit('cartVisibilityChange', false);
        },
        showMobMenu(){
            console.log('you need to write this function!');
        }
    },
     directives:{
        'click-outside': {
            bind: function (el, binding, vnode) {
                el.clickOutsideEvent = function (event) {
                    if (!(el == event.target || el.contains(event.target) || event.target.closest('.buyBtn'))) {
                        vnode.context[binding.expression](event);
                    }
                };
                document.body.addEventListener('click', el.clickOutsideEvent)
            },
            unbind: function (el) {
                document.body.removeEventListener('click', el.clickOutsideEvent)
            },
        }
    },
    created(){
        eventBus.$on('cartVisibilityChange', (cartIsShown) =>{
            this.cartIsShown = cartIsShown;
        });
    }
}
</script>
