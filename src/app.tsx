import { Options, Vue } from "vue-class-component";
import "@/styles/app.less";

@Options({ name: "App", components: {} })
export default class App extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return (
      <el-config-provider size={"small"} z-index={3000}>
        <router-view />
      </el-config-provider>
    );
  }
}
