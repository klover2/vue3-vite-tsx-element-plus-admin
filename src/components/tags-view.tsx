import { Options, Vue } from "vue-class-component";
import "@/styles/navbar-tags.less";
@Options({
  name: "TagsView",
})
export default class extends Vue {
  private visible = false;
  private left = 0;
  private top = 35;
  private selectedTagIndex = 0;
  private tags = [
    {
      title: "测试1",
      path: "1",
    },
    {
      title: "测试2",
      path: "2",
    },
    {
      title: "测试3",
      path: "3",
    },
    {
      title: "测试4",
      path: "4",
    },
  ];

  /**
   * 关闭标签
   */
  private closeTag(event: MouseEvent, index: number) {
    event.stopPropagation();
    event.preventDefault();
    this.tags.splice(index, 1);
  }
  /**
   * 右击打开菜单
   * @param event
   */
  private openMenu(event: MouseEvent, index: number) {
    event.preventDefault();
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = event.clientX - offsetLeft + 15; // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.visible = true;
    this.selectedTagIndex = index;
  }
  /**
   * 是否选中
   * @param index
   */
  private isActive(index: number) {
    return index === this.selectedTagIndex ? "active" : "";
  }
  /**
   * 关闭其他标签
   */
  private closeOtherTag(index: number) {
    // TODO
    this.tags.splice(index, 1);
    this.visible = false;
  }
  /**
   * 关闭所有标签
   */
  private closeAllTag() {
    // TODO
    this.visible = false;
  }
  /**
   * 关闭当前标签
   */
  private closeCurrentTag(index: number) {
    this.tags.splice(index, 1);
    this.visible = false;
  }
  /**
   * 刷新当前选中的标签
   */
  private refreshSelectedTag(index: number) {
    console.log(index);
    // TODO
    // this.$nextTick(() => {
    //   this.$router
    //     .replace({
    //       path: "/redirect" + fullPath,
    //     })
    //     .catch((err) => {
    //       console.warn(err);
    //     });
    // });
    this.visible = false;
  }
  /**
   * render
   */
  public render(): JSX.Element {
    const {
      tags,
      visible,
      left,
      top,
      closeTag,
      openMenu,
      isActive,
      closeOtherTag,
      closeAllTag,
      closeCurrentTag,
      refreshSelectedTag,
    } = this;
    return (
      <div class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper flex justify-start">
          {tags.map((item, index) => (
            <el-link
              class={`tags-view-item ${isActive(index)}`}
              href={item.path}
              onContextmenu={(event: MouseEvent) => openMenu(event, index)}
            >
              {item.title}
              <el-icon
                style="margin-left: 5px;"
                onClick={(event: MouseEvent) => closeTag(event, index)}
              >
                <i-close />
              </el-icon>
            </el-link>
          ))}
        </el-scrollbar>
        <ul
          v-show={visible}
          class="contextmenu"
          style={`left: ${left}px;top: ${top}px;`}
        >
          <li onClick={() => refreshSelectedTag(this.selectedTagIndex)}>
            刷新
          </li>
          <li onClick={() => closeCurrentTag(this.selectedTagIndex)}>关闭</li>
          <li onClick={() => closeOtherTag(this.selectedTagIndex)}>关闭其他</li>
          <li onClick={() => closeAllTag()}>关闭所有</li>
        </ul>
      </div>
    );
  }
}
