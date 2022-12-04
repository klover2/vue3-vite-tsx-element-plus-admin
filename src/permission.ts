/**
 * 权限拦截
 */
import router from "./router";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { UserModule } from "./store/modules/user";

const whiteList = ["/login"];

router.beforeEach(
  async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (UserModule.token) {
      if (to.path === "/login") {
        next({ path: "/" });
      } else {
        // TODO 判断权限是否允许跳转
        next();
      }
    } else {
      if (whiteList.includes(to.path)) {
        next();
      } else {
        next({ path: `/login` });
      }
    }
  }
);

router.afterEach((to: RouteLocationNormalized) => {
  if (to?.meta?.title) document.title = to.meta.title as string;
});
