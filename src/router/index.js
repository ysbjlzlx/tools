import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
  },  {
    path: "/encode/base64",
    name: "Base64",
    component: () => import("../views/encode/Base64.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
