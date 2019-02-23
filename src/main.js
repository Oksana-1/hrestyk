import Vue from 'vue';
import Swiper from 'swiper';
Object.defineProperty(Vue.prototype, '$swiper', { value: Swiper });
import Waypoint from 'waypoints/lib/noframework.waypoints';
Object.defineProperty(Vue.prototype, '$waypoint', { value: Waypoint });
import App from './App.vue';
new Vue({
	el: '#app',
	render: h => h(App)
});
