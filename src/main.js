import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales";
import "element-plus/lib/theme-chalk/index.css";
import "nprogress/nprogress.css";
import "./main.css";
import { Quasar, QBtn } from "quasar";

const app = createApp(App);
app.use(ElementPlus, { size: "small" });
app.use(Quasar, {
  framework: {
    components: [QBtn, "QIcon"],
  },
});
app.use(i18n);
app.use(router);
app.mount("#app");
