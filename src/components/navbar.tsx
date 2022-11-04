import { Options, Vue } from "vue-class-component";
@Options({
  name: "Navbar",
})
export default class Navbar extends Vue {
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
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2" v-slots={{ title: () => "Workspace" }}>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
      </el-menu>
    );
  }
}
