import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
export function fetchData(){
    return Vue.http.get('https://hrestyk-3428d.firebaseio.com/data.json');
}
export function loadOrder(data){
    return  Vue.http.post('https://hrestyk-3428d.firebaseio.com/orders.json', data);
}
export function loadForm(data){
    return  Vue.http.post('https://hrestyk-3428d.firebaseio.com/forms.json', data);
}