import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pool/:address",
    name: "Pool",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pool.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
