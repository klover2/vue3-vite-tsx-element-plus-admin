import { Options, Vue } from "vue-class-component";
import "@/styles/home.less";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import NavbarTags from "@/components/navbar-tags";

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
    const { sidebarCollapse } = this;
    return (
      <el-container class="layout-container-demo" style="height: 100%">
        {/* 侧边栏 */}
        <Sidebar sidebar-collapse={sidebarCollapse} />

        <el-container>
          {/* 顶部栏 */}
          <el-header style="width:100%;height:84px">
            <Navbar />
            <NavbarTags />
          </el-header>

          <el-main>
            {/* <el-scrollbar>
              <div>amin</div>
            </el-scrollbar> */}
          </el-main>
        </el-container>
      </el-container>
    );
  }
}
