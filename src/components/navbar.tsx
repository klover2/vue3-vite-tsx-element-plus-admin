import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Options({
  name: "Navbar",
})
export default class Navbar extends Vue {
  @Prop({ default: false, type: Boolean })
  private modelValue!: boolean;

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
            <i-Fold
              v-show={!this.modelValue}
              onclick={() => this.changeSidebar(true)}
            />
            <i-Expand
              v-show={this.modelValue}
              onclick={() => this.changeSidebar(false)}
            />
          </el-icon>
          <el-breadcrumb separator="/" style="margin-left: 10px;">
            <el-breadcrumb-item to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">promotion management</a>
            </el-breadcrumb-item>
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
