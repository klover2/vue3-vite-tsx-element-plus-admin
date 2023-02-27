import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { _RouteRecordBase } from "vue-router";
import "@/styles/navbar.scss";
import { UserModule } from "@/store/modules/user";
import { TagsViewModule } from "@/store/modules/tags-view";
import LangSelect from "./lang-select";
import ScreenFull from "./screen-full";

interface IBreadcrumb {
  path: _RouteRecordBase["path"];
  name: _RouteRecordBase["name"];
  title: string;
}

@Options({
  name: "Navbar",
})
export default class extends Vue {
  @Prop({ default: false, type: Boolean })
  private modelValue!: boolean;

  private breadcrumbs: IBreadcrumb[] = [];

  public created() {
    this.dealBreadcrumbs();
  }

  @Watch("$route")
  public routeChange() {
    this.dealBreadcrumbs();
  }

  private get avatar() {
    return UserModule.avatar;
  }

  /**
   * 处理面包屑数据- 找到对应的页面
   */
  private dealBreadcrumbs() {
    const matchedList = this.$route.matched.filter((item) => item?.meta?.title);
    this.breadcrumbs = [];

    for (const val of matchedList) {
      if (["home", "workplace"].includes(val.name as string)) continue;
      this.breadcrumbs.push({
        name: val.name,
        path: val.path,
        title: (val?.meta?.title || "") as string,
      });
    }
  }

  /**
   * 切换侧边栏
   * @param change
   */
  private changeSidebar(change: boolean) {
    this.$emit("update:modelValue", change);
  }

  /**
   * 退出登录
   */
  private logout() {
    sessionStorage.removeItem("store");
    TagsViewModule.delAllViews();
    this.$router.replace({
      path: "/login",
    });
  }

  /**
   * render
   */
  public render(): JSX.Element {
    const { breadcrumbs, logout } = this;
    return (
      <el-menu
        class="navbar-container"
        mode="horizontal"
        ellipsis={false}
        style="height:50px"
        router={false}
      >
        <div
          class="el-menu-left"
          style="display: flex;align-items: center;padding-left: 10px;"
        >
          <el-icon>
            <i-fold
              v-show={!this.modelValue}
              onclick={() => this.changeSidebar(true)}
            />
            <i-expand
              v-show={this.modelValue}
              onclick={() => this.changeSidebar(false)}
            />
          </el-icon>
          <el-breadcrumb separator="/" style="margin-left: 10px;">
            <el-breadcrumb-item to={{ path: "/" }}>工作台</el-breadcrumb-item>
            {breadcrumbs.map((item) => (
              <el-breadcrumb-item>
                <router-link to={{ path: item.path }}>{item.title}</router-link>
              </el-breadcrumb-item>
            ))}
          </el-breadcrumb>
        </div>
        <div class="flex-grow" />
        <ScreenFull />
        <LangSelect />
        <el-dropdown
          trigger="click"
          v-slots={{
            dropdown: () => (
              <el-dropdown-menu>
                <el-dropdown-item onclick={() => logout()}>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            ),
          }}
        >
          <span class="el-dropdown-link">
            <img
              src={this.avatar}
              class="user-avatar"
              style="display: inline-block;"
            />
            <el-icon size={14}>
              <i-caret-bottom />
            </el-icon>
          </span>
        </el-dropdown>
      </el-menu>
    );
  }
}
