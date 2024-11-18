import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Zorg dat dit pad correct is

createApp(App).use(router).mount('#app');
