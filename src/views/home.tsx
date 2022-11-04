import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

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
        <el-button type="primary" icon="i-Search">
          Search
        </el-button>
        <el-icon size={"20"}>
          <i-Edit />
        </el-icon>
      </div>
    );
  }
}
