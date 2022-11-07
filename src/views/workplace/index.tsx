import { Options, Vue } from "vue-class-component";

@Options({
  name: "Workplace",
})
export default class Workplace extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return <div>工作台</div>;
  }
}
