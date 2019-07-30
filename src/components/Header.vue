<template>
    <div class="hr-header-wrap" :class="{mobMenuIsOpened: mobMenuIsOpened, cartIsShown: cartIsShown}">
        <div class="pc-header">
            <div class="c-box-1100 hr-header-wrap">
                <div class="nav-cont">
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
                        <div class="social-cont social-cont-mobMenu">
                            <a href="#" class="social-link">
                                <icon-base icon-name="fb"><icon-fb /></icon-base>
                            </a>
                            <a href="#" class="social-link">
                                <icon-base icon-name="ig"><icon-ig /></icon-base>
                            </a>  
                            <a href="#" class="social-link">
                                <icon-base icon-name="ig"><icon-twitter /></icon-base>
                            </a>   
                        </div>         
                    </nav>
                </div>
                <div class="hr-sandwich-wrap">
                    <button class="hr-sandwich"  @click="mobMenuCtrl">
                    </button>
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
        <div class="mob-overlay"></div>
    </div>
</template>
<script>
import eventBus from '../event-bus';
import IconBase from '../components/IconBase.vue';
import IconCart from '../components/icons/IconCart.vue';
import Cart from '../components/Cart.vue';
import IconFb from '../components/icons/IconFb.vue';
import IconIg from '../components/icons/IconIg.vue';
import IconTwitter from '../components/icons/IconTwitter.vue';
import IconPhone from '../components/icons/IconPhone.vue';
import IconEmail from '../components/icons/IconEmail.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
            IconBase,
            IconCart,
            IconFb,
            IconIg,
            IconTwitter,
            IconPhone,
            IconEmail,
            appCart : Cart
    },
    data(){
        return {
            cartIsShown: false,
            mobMenuIsOpened: false
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
            this.cartIsShown = !this.cartIsShown;
        },
        closeEvent() {
            this.cartIsShown = false;
            eventBus.$emit('cartVisibilityChange', false);
        },
       mobMenuCtrl(){
            this.mobMenuIsOpened = !this.mobMenuIsOpened;
            eventBus.$emit('mobMenuVisibilityChange', this.mobMenuIsOpened);
            document.querySelector('body').classList.toggle('mobMenuOpened');
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
        eventBus.$on('mobMenuVisibilityChange', (mobMenuIsOpened) =>{
            this.mobMenuIsOpened = mobMenuIsOpened;
        });
    }
}
</script>
