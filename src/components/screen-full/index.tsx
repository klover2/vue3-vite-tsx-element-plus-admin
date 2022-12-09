import { Options, Vue } from "vue-class-component";
import screenFull from "screenfull";

@Options({
  name: "ScreenFull",
})
export default class extends Vue {
  private isFullscreen = false;

  private changeFullscreen() {
    if (!screenFull.isEnabled) {
      return false;
    }
    screenFull.toggle();
  }

  private change() {
    if (screenFull.isEnabled) {
      this.isFullscreen = screenFull.isFullscreen;
    }
  }

  public mounted() {
    if (screenFull.isEnabled) {
      screenFull.on("change", this.change);
    }
  }

  public unmounted() {
    if (screenFull.isEnabled) {
      screenFull.off("change", this.change);
    }
  }

  public render(): JSX.Element {
    const { isFullscreen, changeFullscreen } = this;
    return (
      <div class="flex items-center">
        <svg-icon
          name={isFullscreen ? "exit-fullscreen" : "fullscreen"}
          color={"#5a5e66"}
          width={"16"}
          height={"16"}
          onclick={() => changeFullscreen()}
        />
      </div>
    );
  }
}
