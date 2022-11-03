import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Search, Edit } from "@element-plus/icons-vue";

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
      <div class="text-8xl">
        <el-button type="primary" icon={Search}>
          Search
        </el-button>
        <el-icon size={"20"}>
          <Edit />
        </el-icon>
      </div>
    );
  }
}
