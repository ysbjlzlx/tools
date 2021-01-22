import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HelloWorld.vue"),
  },
  {
    path: "/hash",
    name: "Hash",
    component: () => import("../views/Hash.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
