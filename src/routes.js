import Main from './components/Main.vue';
import Catalog from './components/Catalog.vue';
import Product from './components/Product.vue';
import Delivery from './components/Delivery.vue';
export const routes = [
    { path: '', component: Main },
    { path: '/catalog', component: Catalog },
    { path: '/catalog/:id', component: Product },
    { path: '/delivery', component: Delivery },
    { path: '*', redirect: '/' }
];