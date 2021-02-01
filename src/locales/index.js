import { createI18n } from "vue-i18n";
import en from "./en.json";
import zh_hans_cn from "./zh-Hans-CN.json";
import zh_hans_hk from "./zh-Hans-HK.yaml";

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

export default i18n;
