import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "MyTable",
})
export default class extends Vue {
  @Prop({ default: () => [], type: Array })
  private tableData!: any[];

  /**
   * name
   */
  public render(): JSX.Element {
    const { tableData } = this;
    return (
      <div class="table-container" style="width: 100%">
        <el-table {...this.$attrs} data={tableData}>
          <el-table-column prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="120" />
          <el-table-column prop="address" label="Address" />
          <el-table-column prop="zip" label="Zip" width="120" />
        </el-table>
      </div>
    );
  }
}
