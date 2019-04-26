<template>
  <div class="main-wrap">
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
			}
		},
		created(){
			this.setFetchedMslider();
			this.setFetchedProducts();
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
