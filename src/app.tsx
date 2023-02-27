import { Options, Vue } from "vue-class-component";
import "@/styles/app.scss";
import { TagsViewModule } from "./store/modules/tags-view";
import { KeepAlive } from "vue";
import Store from "@/store";
// 导入 Element Plus 语言包
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
import { AppModule } from "./store/modules/app";

@Options({ name: "App", components: {} })
export default class App extends Vue {
  // 语言
  private lang: Record<string, any> = {
    zhCn: zhCn,
    en: en,
  };

  private get language() {
    return AppModule.language;
  }

  private get locale() {
    return this.lang[this.language];
  }

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
    const { cachedViews, key, locale } = this;
    return (
      <KeepAlive include={cachedViews}>
        <el-config-provider size={"default"} z-index={3000} locale={locale}>
          <router-view key={key} />
        </el-config-provider>
      </KeepAlive>
    );
  }
}
