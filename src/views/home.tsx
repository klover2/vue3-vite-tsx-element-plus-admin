import { Options, Vue } from "vue-class-component";
import "@/styles/home.scss";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TagsView from "@/components/tags-view";
import Watermark2 from "@/utils/watermark";
import { UserModule } from "@/store/modules/user";

@Options({
  name: "Home",
})
export default class Home extends Vue {
  // 侧边栏
  private sidebarCollapse = false;

  // 设置水印
  private setWatermark(username: string) {
    Watermark2(
      {
        watermark_txt: username,
        watermark_position: "fixed",
        watermark_x: 0, // 水印起始位置x轴坐标
        watermark_y: 0, // 水印起始位置Y轴坐标
        watermark_rows: 15, // 水印行数
        watermark_cols: 10, // 水印列数
        watermark_x_space: 120, // 水印x轴间隔
        watermark_y_space: 80, // 水印y轴间隔
        watermark_color: "#dddddd", // 水印字体颜色
        watermark_alpha: 0.7, // 水印透明度
        watermark_fontsize: "14px", // 水印字体大小
        watermark_font: "微软雅黑", // 水印字体
        watermark_width: 140, // 水印宽度
        watermark_height: 15, // 水印长度
        watermark_angle: 15, // 水印倾斜度数
      },
      "#app"
    );
  }

  private get nickname() {
    return UserModule.username;
  }

  // 注册水印
  public mounted() {
    this.setWatermark(this.nickname);
  }

  // 清除水印
  public unmounted() {
    this.setWatermark("");
  }

  /**
   * render
   */
  public render(): JSX.Element {
    return (
      <el-container class="layout-container-demo" style="height: 100%">
        {/* 侧边栏 */}
        <Sidebar sidebar-collapse={this.sidebarCollapse} />

        <el-container id="#container">
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
