import { h, resolveComponent } from "vue";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import {
  RouteLocationMatched,
  RouteRecordRaw,
  useRoute,
  _RouteRecordBase,
} from "vue-router";
interface ISidebar {
  path: _RouteRecordBase["path"];
  redirect: _RouteRecordBase["redirect"] | undefined;
  name: _RouteRecordBase["name"];
  meta: Exclude<_RouteRecordBase["meta"], void>;
  children: RouteRecordRaw[];
}

@Options({
  name: "Sidebar",
})
export default class extends Vue {
  @Prop({ default: false, type: Boolean })
  private sidebarCollapse!: boolean;

  // 路由
  private routeList: ISidebar[] = [];

  public created(): void {
    const matchedList: RouteLocationMatched[] = useRoute().matched;
    if (matchedList[0]) {
      matchedList[0].children && this.dealSidebar(matchedList[0].children);
    }
  }

  /**
   * 处理侧边栏需要的数据
   */
  private dealSidebar(matchedList: RouteRecordRaw[]) {
    for (const val of matchedList) {
      if (val.meta?.hidden === false) continue;
      this.routeList.push({
        path: val.path || "",
        redirect: val.redirect || "",
        name: val.name,
        meta: val.meta || {},
        children: val.children || [],
      });
    }
  }
  /**
   * 子菜单栏
   * @param route
   * @returns
   */
  private subMenu(route: ISidebar): JSX.Element {
    return (
      <>
        {route?.meta?.hidden === true ? (
          ""
        ) : (
          <el-sub-menu
            index={route.path}
            v-slots={{
              title: () => (
                <>
                  <el-icon
                    v-slots={{
                      default: () =>
                        h(
                          resolveComponent(
                            (route.meta.icon as string) || "i-menu"
                          )
                        ),
                    }}
                  ></el-icon>
                  <span>{route?.meta && route?.meta.title}</span>
                </>
              ),
            }}
          >
            {route.children.map((children) =>
              children?.meta?.hidden === true ? (
                ""
              ) : (
                <el-menu-item index={children.path}>
                  {children?.meta && children?.meta.title}
                </el-menu-item>
              )
            )}
          </el-sub-menu>
        )}
      </>
    );
  }
  private menuItem(route: ISidebar): JSX.Element {
    return (
      <>
        {route?.meta?.hidden === true ? (
          ""
        ) : (
          <el-menu-item index={route.path}>
            <el-icon
              v-slots={{
                default: () =>
                  h(resolveComponent((route.meta.icon as string) || "i-menu")),
              }}
            ></el-icon>
            <span>{route?.meta && route?.meta.title}</span>
          </el-menu-item>
        )}
      </>
    );
  }

  /**
   * render
   */
  public render(): JSX.Element {
    const { sidebarCollapse, routeList, subMenu, menuItem } = this;
    return (
      <el-scrollbar height="100%" class="bg-[#304156]">
        <el-menu
          active-text-color="#ffd04b"
          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          class="el-menu-vertical-demo"
          collapse={sidebarCollapse}
          router={true}
        >
          {routeList.map((route: ISidebar) =>
            route.children.length > 0 ? subMenu(route) : menuItem(route)
          )}
        </el-menu>
      </el-scrollbar>
    );
  }
}
