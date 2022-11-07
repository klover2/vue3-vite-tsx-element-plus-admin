import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/test",
        name: "Test",
        component: () => import(/* webpackChunkName: "Test" */ "../views/test"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
