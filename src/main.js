import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus);
app.use(router);

app.mount('#app');
app.config.globalProperties.$axios = axios