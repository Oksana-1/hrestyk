<template>
  <div class="main-wrap">
		<header class="pc-header">
			<div class="c-box-1100">
			<div class="nav-cont">
				<div @click="navigateToHome()" class="logo-fix">
					<img class="fits" src="./assets/images/logo.png" alt="Logo"/>
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
			</div>
		</header>
		<transition name="fade" mode="out-in">
			<router-view :initWaypointProp = "initWaypoint"></router-view>
		</transition>
		<footer class="hr-footer">
			<div class="c-box-1100 footer-content">
				<div class="footer-contact-block">
					<div class="styled-form">
						<form>
							<div class="input-row">
								<input type="text" placeholder="Ваше ім'я" v-model="footerFormData.name"/>
							</div>
							<div class="input-row">
								<input type="text" placeholder="Ваш телефон" v-model="footerFormData.phone"/>
							</div>
							<div class="input-row">
								<textarea placeholder="Ваше повідомлення"  v-model="footerFormData.message"></textarea>
							</div>
							<div class="input-row">
								<input type="submit" value="Відправити"/>
							</div>
						</form>
					</div>
				</div>
				<div class="footer-logo-block">
					<div @click="navigateToHome()"  class="logo-fix">
						<img class="fits" src="./assets/images/logo.png" alt="Logo"/>
					</div>
					<div class="social-cont">
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
				</div>
				<div class="footer-nav-block">
					<nav class="footer-nav">
						<ul>
							<li><router-link to="/">Головна</router-link></li>
							<li><router-link to="/catalog">Каталог</router-link></li>
							<li><router-link to="/about">Про нас</router-link></li>
							<li><router-link to="/delivery">Оплата та доставка</router-link></li>
						</ul>
					</nav> 
					<div class="footer-contact-container">
						<a href="mailto:4438488@gmail.com" class="contact-link">
							<icon-base icon-name="email" view-box="0 0 382 382" width="15" height="15"><icon-email /></icon-base>
							<div class="contact-text">4438488@gmail.com</div>
						</a>
						<a href="tel:+380504438488" class="contact-link">
							<icon-base icon-name="phone" view-box="0 0 348 348" width="15" height="15"><icon-phone /></icon-base>
							<div class="contact-text">+380 50 443 84 88</div>
						</a>   
					</div>                                                                        
				</div>
			</div>
		</footer>
  </div>
</template>

<script>
	import IconBase from './components/IconBase.vue';
	import IconFb from './components/icons/IconFb.vue';
	import IconIg from './components/icons/IconIg.vue';
	import IconTwitter from './components/icons/IconTwitter.vue';
	import IconPhone from './components/icons/IconPhone.vue';
	import IconEmail from './components/icons/IconEmail.vue';
	import { mapActions } from 'vuex';
	export default {
		components:{
			IconBase,
			IconFb,
			IconIg,
			IconTwitter,
			IconPhone,
			IconEmail
		},
		data: function(){
			return{
				footerFormData: {
					name: '',
					phone: '',
					message: ''
				}
			}
		},
		methods:{
			...mapActions(['setFetchedProducts', 'setFetchedMslider']),
			initWaypoint() {
				let waypointElements = document.querySelectorAll('.waypoint');
				waypointElements.forEach(function(waypointElement){
					let waypoint = new Waypoint({
						element: waypointElement,
						handler: function() {
							waypointElement.classList.add('waypoint-done')
						},
						offset: '80%'
					});
				});
			},
			navigateToHome(){
				this.$router.push({path: '/'});
			},
			fetchData () {
                this.$http.get('https://hrestyk-3428d.firebaseio.com/data.json').
                then(response =>{
                    return response.json();
                }, error =>{
                    console.log(error);
                }).then(data => {
					const productArray = [];
					const sliderArray = [];
					for(let key in data.products){
						productArray.push(data.products[key]);
					}
					for(let key in data.mslider){
						sliderArray.push(data.mslider[key]);
					}
					this.setFetchedProducts(productArray);
					this.setFetchedMslider(sliderArray);
                });
            }
		},
		created(){
			let mainWrap = document.querySelector('.main-wrap');
			window.addEventListener('scroll', function() {
				if(window.pageYOffset > 70){
					mainWrap.classList.add('header-fixed');
				}
				else{
					mainWrap.classList.remove('header-fixed');
				}
			});
			this.fetchData();
		}
	}
</script>
<style lang="scss">
  @import './assets/css/reset.css';
  @import './assets/css/abstracts.scss';
  @import './assets/css/base.scss';
  @import './assets/css/layuots.scss';
</style>
