import { Options, Vue } from "vue-class-component";

@Options({
  name: "Test",
})
export default class Test extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return <div>test</div>;
  }
}
