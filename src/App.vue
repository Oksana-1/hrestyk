<template>
  <div class="main-wrap"
  		:class="contentClass">
		<app-header></app-header>
		<transition name="fade" mode="out-in">
			<router-view :initWaypointProp = "initWaypoint"></router-view>
		</transition>
		<app-footer></app-footer>
  </div>
</template>

<script>
	import { mapActions } from 'vuex';
	import Header from './components/Header.vue';
	import Footer from './components/Footer.vue';
	export default {
		components:{
			appHeader: Header,
			appFooter: Footer
		},
		data(){
			return{
				contentClass: ''
			}
		},
		watch: {
			'$route'(to, from){
				switch(to.path) {
					case '/': 
						this.contentClass = 'main-page';
						break;
					case '/catalog':
						this.contentClass = 'catalog-page';
						break;
					case '/about':
						this.contentClass = 'about-page';
						break;
					case '/delivery':
						this.contentClass = 'delivery-page';
						break;
					case '/checkout':
						this.contentClass = 'checkout-page';
						break;	
				}
				if(to.params.id){
					this.contentClass = 'catalog-inner-page';
				}
			}
    	},
		methods:{
			...mapActions(['setFetchedData']),
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
			}
		},
		created(){
			this.setFetchedData();
		},
		mounted(){
			let mainWrap = document.querySelector('.main-wrap');
			window.addEventListener('scroll', function() {
				if(window.pageYOffset > 70){
					mainWrap.classList.add('header-fixed');
				}
				else{
					mainWrap.classList.remove('header-fixed');
				}
			});
		},
	}
</script>
<style lang="scss">
  @import './assets/css/reset.css';
  @import './assets/css/abstracts.scss';
  @import './assets/css/base.scss';
  @import './assets/css/layuots.scss';
</style>
