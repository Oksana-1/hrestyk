import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Swiper from 'swiper';
Object.defineProperty(Vue.prototype, '$swiper', { value: Swiper });
import Waypoint from 'waypoints/lib/noframework.waypoints';
Object.defineProperty(Vue.prototype, '$waypoint', { value: Waypoint });
import App from './App.vue';
Vue.use(VueResource);
Vue.use(VueRouter);
import { routes } from './routes';
const router = new VueRouter({
	routes,
	mode: 'history',
	scrollBehavior(to, from, savedPosition){
		if(savedPosition){ return savedPosition; }
		if(to.hash){return {selector: to.hash}}
		return { x:0, y: 0 }
	}
});
Vue.http.options.root = 'https://hrestyk-3428d.firebaseio.com/data.json';
new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
