import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import zh_hans_cn from "./locales/zh-Hans-CN.json";
import zh_hans_hk from "./locales/zh-Hans-HK.yaml";

const i18n = createI18n({
  legacy: false,
  locale: "zh-Hans-CN",
  fallbackLocale: "en",
  messages: {
    en: en,
    "zh-Hans-CN": zh_hans_cn,
    "zh-Hans-HK": zh_hans_hk,
  },
});

router.afterEach((to, from, next) => {
  const lang = window.localStorage.getItem("lang");
  if (lang && i18n.global.availableLocales.includes(lang)) {
    i18n.global.locale = lang;
  }
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
