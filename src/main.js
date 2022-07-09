import { createApp } from 'vue';
import App from './App.vue';
import regDirective from './directive.js';

const app = createApp(App);

regDirective(app);

app.mount('#app');
