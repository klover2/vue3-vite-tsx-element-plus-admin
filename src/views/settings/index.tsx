import { Options, Vue } from "vue-class-component";

@Options({
  name: "Settings",
})
export default class Settings extends Vue {
  /**
   * render
   */
  public render(): JSX.Element {
    return <div>设置</div>;
  }
}
