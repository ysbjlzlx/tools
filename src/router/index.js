import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HelloWorld.vue"),
  },
  {
    path: "/md5",
    name: "MD5",
    component: () => import("../views/MD5.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
