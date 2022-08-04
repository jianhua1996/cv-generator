import { createApp } from 'vue';
import App from './App.vue';
import regDirective from './directive.js';
import { basicSetup } from 'codemirror';
import VueCodemirror from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';

import { createWatcher } from 'next-vue-storage-watcher';

const app = createApp(App);
regDirective(app);

const lsWatcher = createWatcher({
  prefix: 'cv_sys_'
});

app
  .use(VueCodemirror, {
    extensions: [basicSetup, javascript()]
    // ...
  })
  .use(lsWatcher)
  .mount('#app');
