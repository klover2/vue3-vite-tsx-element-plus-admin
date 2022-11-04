import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "Home",
})
export default class Sidebar extends Vue {
  @Prop({ default: false, type: Boolean })
  private sidebarCollapse!: boolean;

  /**
   * render
   */
  public render(): JSX.Element {
    const { sidebarCollapse } = this;
    return (
      <el-scrollbar height="100%" class="bg-[#304156]">
        <el-menu
          active-text-color="#ffd04b"
          background-color="rgb(48, 65, 86)"
          text-color="#fff"
          class="el-menu-vertical-demo"
          collapse={sidebarCollapse}
        >
          <el-sub-menu
            index="1"
            v-slots={{
              title: () => (
                <>
                  <el-icon>
                    <i-Location />
                  </el-icon>
                  <span>Navigator One</span>
                </>
              ),
            }}
          >
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
            <el-menu-item index="1-3">Option 3</el-menu-item>
            <el-sub-menu index="1-4" v-slots={{ title: () => "Option4" }}>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu
            index="2"
            v-slots={{
              title: () => (
                <>
                  <el-icon>
                    <i-Location />
                  </el-icon>
                  <span>Navigator Two</span>
                </>
              ),
            }}
          >
            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
            <el-menu-item index="2-3">Option 3</el-menu-item>
            <el-sub-menu index="2-4" v-slots={{ title: () => "Option 4" }}>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    );
  }
}
