import { AppModule } from "@/store/modules/app";
import { Options, Vue } from "vue-class-component";
@Options({
  name: "LangSelect",
})
export default class extends Vue {
  /**
   * 语言
   */
  private language = AppModule.language;
  /**
   * 更改语言
   */
  private changeLanguage(lang: string) {
    this.language = lang;
    this.$i18n.locale = lang;
    AppModule.setLanguage(lang);
  }

  public render(): JSX.Element {
    return (
      <el-dropdown
        onCommand={(command: string) => this.changeLanguage(command)}
        trigger="click"
        v-slots={{
          dropdown: () => (
            <el-dropdown-menu>
              <el-dropdown-item
                command="zhCn"
                disabled={this.language === "zhCn"}
              >
                中文
              </el-dropdown-item>
              <el-dropdown-item command="en" disabled={this.language === "en"}>
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          ),
        }}
      >
        <span class="el-dropdown-link">
          <svg-icon
            name="language"
            color={"#5a5e66"}
            width={"16"}
            height={"16"}
          />
        </span>
      </el-dropdown>
    );
  }
}
