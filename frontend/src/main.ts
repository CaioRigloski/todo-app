import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router.ts';
import { setupAxiosInterceptors } from './plugins/axios.ts';


const app = createApp(App);
app.use(createPinia());
app.use(router);

setupAxiosInterceptors();

app.mount('#app');