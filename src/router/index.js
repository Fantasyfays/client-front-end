import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import CreateInvoice from '../components/CreateInvoice.vue';
import InvoiceList from '../components/InvoiceList.vue'; // Correct geïmporteerd

// Simpele functie om inlogstatus te controleren
function isAuthenticated() {
    return !!localStorage.getItem('loggedInUser');
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/create-invoice',
        name: 'CreateInvoice',
        component: CreateInvoice,
        meta: { requiresAuth: true },
    },
    {
        path: '/invoices',
        name: 'InvoiceList',
        component: InvoiceList, // Correct gebruikt
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else {
        next();
    }
});

export default router;
