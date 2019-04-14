import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
export function fetchData (){
    return Vue.http.get('https://hrestyk-3428d.firebaseio.com/data.json');
}