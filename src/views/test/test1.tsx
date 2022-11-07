import { Options, Vue } from "vue-class-component";

@Options({
  name: "Test1",
})
export default class Test1 extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return <div>test1</div>;
  }
}
