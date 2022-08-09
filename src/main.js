import { createApp } from 'vue';
import App from './App.vue';
// 引入注册自定义指令的方法
import regDirective from './directive.js';
// 引入vue-codemirror插件
import VueCodemirror from 'vue-codemirror';
import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
// 引入vue-storage插件
import { createWatcher } from 'next-vue-storage-watcher';

const app = createApp(App); // 创建应用实例
regDirective(app); // 注册指令

// 创建lsWatcher实例
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
