import MyTable from "@/components/table";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "Test1",
})
export default class Test1 extends Vue {
  private tableData = [
    {
      date: "2016-05-03",
      name: "Tom",
      state: "California",
      city: "Los Angeles",
      address: "No. 189, Grove St, Los Angeles",
      zip: "CA 90036",
    },
  ];
  /**
   * render
   */
  public render(): JSX.Element {
    const { tableData } = this;
    return (
      <div style="width: 100%">
        <MyTable {...{ size: "large", border: true, tableData }} />
      </div>
    );
  }
}
