import { Options, Vue } from "vue-class-component";
import "@/styles/app.less";
import { TagsViewModule } from "./store/modules/tags-view";
import { KeepAlive } from "vue";

@Options({ name: "App", components: {} })
export default class App extends Vue {
  private get cachedViews() {
    return TagsViewModule.cachedViews;
  }

  private get key() {
    return this.$route.path;
  }
  /**
   * render
   */
  public render(): JSX.Element {
    const { cachedViews, key } = this;
    return (
      <KeepAlive include={cachedViews}>
        <el-config-provider size={"small"} z-index={3000}>
          <router-view key={key} />
        </el-config-provider>
      </KeepAlive>
    );
  }
}
