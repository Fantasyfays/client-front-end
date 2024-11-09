import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import Login from './components/Login.vue';
import InvoiceView from './views/InvoiceView.vue';
import Home from './components/Home.vue';
import './assets/base.css';
import './assets/main.css';
import './assets/invoice.css';
import './assets/createInvoice.css';
import './assets/home.css';
import './assets/login.css';



const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/invoice', component: InvoiceView }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = document.cookie.includes("username=");
    if ((to.path === '/home' || to.path === '/invoice') && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

const app = createApp(App);
app.use(router);
app.mount('#app');
