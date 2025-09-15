import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.dark.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(Antd).use(router).mount("#app");
