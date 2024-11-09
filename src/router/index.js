import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import InvoiceView from '@/views/InvoiceView.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/', component: Home },
        { path: '/invoice', component: InvoiceView },
    ],
});
