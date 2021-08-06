import { boot } from "quasar/wrappers";

import NProgress from "nprogress";
import i18n from "../locales";

export default boot(({ app, router, store }) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
  });

  router.afterEach((to, from) => {
    const lang = window.localStorage.getItem("lang");
    if (lang && i18n.global.availableLocales.includes(lang)) {
      i18n.global.locale = lang;
    }
    NProgress.done();
  });
});
