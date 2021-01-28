import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "vue-i18n";
import en from "./locales/en.yaml";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages: {
    en,
  },
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount("#app");
