import { Options, Vue } from "vue-class-component";
import "@/styles/home.less";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TagsView from "@/components/tags-view";

@Options({
  name: "Home",
})
export default class Home extends Vue {
  // 侧边栏
  private sidebarCollapse = false;

  /**
   * render
   */
  public render(): JSX.Element {
    return (
      <el-container class="layout-container-demo" style="height: 100%">
        {/* 侧边栏 */}
        <Sidebar sidebar-collapse={this.sidebarCollapse} />

        <el-container>
          {/* 顶部栏 */}
          <el-header style="width:100%;height:84px">
            <Navbar v-model={this.sidebarCollapse} />
            <TagsView />
          </el-header>

          <el-main>
            <div class="main-container">
              <router-view />
            </div>
          </el-main>
        </el-container>
      </el-container>
    );
  }
}
