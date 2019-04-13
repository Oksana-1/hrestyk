import Vue from 'vue';

import { createRouter } from './routes';
const router = createRouter();
import { createStore } from './store/store';
const store = createStore();

import VueResource from 'vue-resource';
Vue.use(VueResource);

import Swiper from 'swiper';
Object.defineProperty(Vue.prototype, '$swiper', { value: Swiper });
import Waypoint from 'waypoints/lib/noframework.waypoints';
Object.defineProperty(Vue.prototype, '$waypoint', { value: Waypoint });
import App from './App.vue';

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
