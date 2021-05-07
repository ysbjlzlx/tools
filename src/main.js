import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales";
import "element-plus/lib/theme-chalk/index.css";
import "nprogress/nprogress.css";
import "./main.css";

const app = createApp(App);
app.use(ElementPlus, { size: "small" });
app.use(i18n);
app.use(router);
app.mount("#app");
