import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    redirect: "/workplace",
    meta: { hidden: true },
    children: [
      {
        path: "/workplace",
        name: "workplace",
        component: () =>
          import(/* webpackChunkName: "Workplace" */ "../views/workplace"),
        meta: { title: "工作台", icon: "i-tools", affix: true },
      },
      {
        path: "/settings",
        name: "settings",
        component: () =>
          import(/* webpackChunkName: "Settings" */ "../views/settings"),
        meta: { title: "设置", icon: "i-setting" },
      },
      {
        path: "/test",
        name: "test",
        meta: { title: "test" },
        children: [
          {
            path: "/test1",
            name: "test1",
            component: () =>
              import(/* webpackChunkName: "test1" */ "../views/test/test1"),
            meta: { title: "test1" },
          },
          {
            path: "/test2",
            name: "test2",
            component: () =>
              import(/* webpackChunkName: "test2" */ "../views/test/test2"),
            meta: { hidden: false, title: "test2" },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
