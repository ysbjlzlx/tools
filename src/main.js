import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./locales/en.yaml";
import zh_hans_cn from "./locales/zh-Hans-CN.yaml";

const i18n = createI18n({
  locale: "zh-Hans-CN",
  fallbackLocale: "en",
  messages: {
    en,
    "zh-Hans-CN": zh_hans_cn,
  },
});
router.beforeEach((to, from, next) => {
  const lang = window.localStorage.getItem("lang");
  to.query.lang = lang;
  next();
});
router.afterEach((to, from, next) => {
  if (to.query.lang) {
    i18n.global.locale = to.query.lang;
  }
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
