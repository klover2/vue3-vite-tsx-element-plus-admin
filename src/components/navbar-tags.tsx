import { Options, Vue } from "vue-class-component";
import "@/styles/navbar-tags.less";
@Options({
  name: "NavbarTags",
})
export default class NavbarTags extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return (
      <div class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper flex justify-start">
          <el-link
            class="tags-view-item active"
            href="https://element.eleme.io"
            target="_blank"
          >
            default
            <el-icon style="margin-left: 5px;">
              <i-Close />
            </el-icon>
          </el-link>
          <el-link
            class="tags-view-item"
            href="https://element.eleme.io"
            target="_blank"
          >
            default2
            <el-icon style="margin-left: 5px;">
              <i-Close />
            </el-icon>
          </el-link>
        </el-scrollbar>
        <ul v-show="visible" class="contextmenu">
          <li>刷新</li>
          <li>关闭</li>
          <li>关闭其他</li>
          <li>关闭所有</li>
        </ul>
      </div>
    );
  }
}
