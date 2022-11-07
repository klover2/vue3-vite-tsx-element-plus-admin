import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { _RouteRecordBase } from "vue-router";

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
   * render
   */
  public render(): JSX.Element {
    const { breadcrumbs } = this;
    return (
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        ellipsis={false}
        style="height:50px"
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
                <a href={item.path !== "/" ? item.path : "javascript:void(0);"}>
                  {item.title}
                </a>
              </el-breadcrumb-item>
            ))}
          </el-breadcrumb>
        </div>
        <div class="flex-grow" />
        <el-sub-menu
          index="1"
          v-slots={{
            title: () => <img src="/img/user-avatar.gif" class="user-avatar" />,
          }}
        >
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
      </el-menu>
    );
  }
}
