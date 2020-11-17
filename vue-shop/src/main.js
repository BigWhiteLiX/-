import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import axios from 'axios';
// 本地地址
// axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 线上配置好的后台服务
axios.defaults.baseURL = "http://www.wanlum.com:8888/api/private/v1/";


let app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(router)
  .use(Antd)
  .mount("#app");
