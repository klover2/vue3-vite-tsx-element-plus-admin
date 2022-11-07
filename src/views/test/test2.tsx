import { Options, Vue } from "vue-class-component";

@Options({
  name: "Test2",
})
export default class Test2 extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return <div>test2</div>;
  }
}
