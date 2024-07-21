import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import './main.css';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const pinia = createPinia();
const vuetify = createVuetify({
    components,
    directives,
});

createApp(App)
    .use(pinia)
    .use(vuetify)
    .mount('#app');
