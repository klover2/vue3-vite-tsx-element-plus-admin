import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Options({
  name: "SvgIcon",
})
export default class extends Vue {
  @Prop({ default: "icon", type: String })
  private prefix!: string;

  @Prop({ default: "20", type: String })
  private width!: string;

  @Prop({ default: "20", type: String })
  private height!: string;

  @Prop({ type: String, required: true })
  private name!: string;

  @Prop({ default: "#889aa4", type: String })
  private color!: string;

  public get symbolId() {
    const symbolId = `#${this.prefix}-${this.name}`;
    return symbolId;
  }

  /**
   * name
   */
  public render(): JSX.Element {
    return (
      <svg aria-hidden="true" width={this.width} height={this.height}>
        <use href={this.symbolId} fill={this.color} />
      </svg>
    );
  }
}
