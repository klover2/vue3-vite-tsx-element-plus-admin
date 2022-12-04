import { Options, Vue } from "vue-class-component";
import "@/styles/app.less";
import { TagsViewModule } from "./store/modules/tags-view";
import { KeepAlive } from "vue";
import Store from "@/store";

@Options({ name: "App", components: {} })
export default class App extends Vue {
  private get cachedViews() {
    return TagsViewModule.cachedViews;
  }

  private get key() {
    return this.$route.path;
  }

  public created(): void {
    // 在页面加载时读取sessionStorage里的状态信息
    const localStore = sessionStorage.getItem("store");

    if (localStore) {
      Store.replaceState(
        Object.assign({}, Store.state, JSON.parse(localStore))
      );
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(Store.state));
    });
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
