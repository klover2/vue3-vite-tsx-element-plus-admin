import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import "@/styles/home.less";

@Options({
  name: "Home",
})
export default class Home extends Vue {
  @Prop({ default: "test", type: String })
  test!: string;

  /**
   * render
   */
  public render(): JSX.Element {
    return (
      <el-container class="layout-container-demo" style="height: 100%">
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu
              active-text-color="#ffd04b"
              background-color="rgb(48, 65, 86)"
              class="el-menu-vertical-demo"
              text-color="#fff"
            >
              <el-sub-menu
                index="1"
                v-slots={{
                  title: () => (
                    <span>
                      <el-icon>
                        <i-Location />
                      </el-icon>
                      <span>Navigator One</span>
                    </span>
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
                    <span>
                      <el-icon>
                        <i-Location />
                      </el-icon>
                      <span>Navigator Two</span>
                    </span>
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
        </el-aside>

        <el-container>
          <el-header style="width:100%">
            <el-menu class="el-menu-demo" st mode="horizontal" ellipsis={false}>
              <el-menu-item index="0">LOGO</el-menu-item>
              <div class="flex-grow" />
              <el-menu-item index="1">Processing Center</el-menu-item>
              <el-sub-menu index="2" v-slots={{ title: () => "Workspace" }}>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4" v-slots={{ title: () => "item four" }}>
                  <el-menu-item index="2-4-1">item one</el-menu-item>
                  <el-menu-item index="2-4-2">item two</el-menu-item>
                  <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-header>

          <el-main>
            <el-scrollbar>
              <div>amin</div>
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-container>
    );
  }
}
