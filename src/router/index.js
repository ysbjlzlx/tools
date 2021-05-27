import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import i18n from "../locales";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/hash",
    name: "Hash",
    component: () => import("../views/Hash.vue"),
  },
  {
    path: "/color",
    name: "Color",
    component: () => import("../views/Color.vue"),
  },
  {
    path: "/json",
    name: "Json",
    component: () => import("../views/Json.vue"),
  },
  {
    path: "/datetime",
    name: "Datetime",
    component: () => import("../views/Datetime.vue"),
  },
  {
    path: "/encode/base64",
    name: "Base64",
    component: () => import("../views/encode/Base64.vue"),
  },
  {
    path: "/encode/urlencode",
    name: "URLEncode",
    component: () => import("../views/encode/URLEncode.vue"),
  },
  {
    path: "/image/placeholder",
    name: "ImagePlaceholder",
    component: () => import("../views/image/Placeholder.vue"),
  },
  {
    path: "/image/qrcode",
    name: "ImageQRCode",
    component: () => import("../views/image/QRCode.vue"),
  },
  {
    path: "/transform/json2yaml",
    name: "Json2yaml",
    component: () => import("../views/transform/Json2yaml.vue"),
  },
  {
    path: "/password/make",
    name: "PasswordMake",
    component: () => import("../views/password/make.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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

export default router;
