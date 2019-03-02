import Vue from 'vue';
import VueResource from 'vue-resource';
import Swiper from 'swiper';
Object.defineProperty(Vue.prototype, '$swiper', { value: Swiper });
import Waypoint from 'waypoints/lib/noframework.waypoints';
Object.defineProperty(Vue.prototype, '$waypoint', { value: Waypoint });
import App from './App.vue';
Vue.use(VueResource);
Vue.http.options.root = 'https://hrestyk-3428d.firebaseio.com/data.json';
new Vue({
	el: '#app',
	render: h => h(App)
});
