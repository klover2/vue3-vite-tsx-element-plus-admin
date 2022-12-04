import { Options, Vue } from "vue-class-component";
@Options({
  name: "LangSelect",
})
export default class extends Vue {
  public render(): JSX.Element {
    return (
      <el-dropdown
        trigger="click"
        v-slots={{
          dropdown: () => (
            <el-dropdown-menu>
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
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
