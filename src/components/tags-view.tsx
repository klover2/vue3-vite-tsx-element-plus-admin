import { Options, Vue } from "vue-class-component";
import "@/styles/navbar-tags.less";
import { ITagView, TagsViewModule } from "@/store/modules/tags-view";
import { Watch } from "vue-property-decorator";
import { RouteRecordRaw, useRoute } from "vue-router";
import path from "path-browserify";

@Options({
  name: "TagsView",
})
export default class extends Vue {
  private visible = false;
  private left = 0;
  private top = 35;
  private selectedTag: ITagView = {};
  private affixTags: ITagView[] = [];

  private get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  @Watch("$route")
  public onRouteChange() {
    this.addTags();
  }

  mounted() {
    this.initTags();

    this.addTags();
  }

  /**
   * 关闭标签
   */
  private closeTag(event: MouseEvent, view: ITagView) {
    event.stopPropagation();
    event.preventDefault();
    TagsViewModule.delView(view);
    this.toLastView(this.visitedViews, view);
    this.visible = false;
  }
  /**
   * 右击打开菜单
   * @param event
   */
  private openMenu(event: MouseEvent, tag: ITagView) {
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
    this.selectedTag = tag;
  }
  /**
   * 是否选中
   */
  private isActive(route: ITagView) {
    return route.path === this.$route.path ? "active" : "";
  }
  /**
   * 是否为固定标签
   * @param tag
   * @returns
   */
  private isAffix(tag: ITagView) {
    return tag.meta && tag?.meta?.affix;
  }

  /**
   * 添加标签
   * @returns
   */
  private addTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    return false;
  }
  /**
   * 初始化标签
   */
  private initTags() {
    const matchedList = useRoute().matched;
    this.affixTags = this.filterAffixTags(matchedList);
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name) {
        TagsViewModule.addVisitedView(tag);
      }
    }
  }
  /**
   * 查询固定标签
   * @param routes
   * @param basePath
   * @returns
   */
  private filterAffixTags(routes: RouteRecordRaw[], basePath = "/") {
    let tags: ITagView[] = [];
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        });
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path);
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags];
        }
      }
    });
    return tags;
  }
  /**
   * 关闭其他标签
   */
  private closeOtherTag() {
    TagsViewModule.delOthersViews(this.selectedTag);
    this.visible = false;
  }
  /**
   * 关闭所有标签
   */
  private closeAllTag(view: ITagView) {
    TagsViewModule.delAllViews();
    if (this.affixTags.some((tag) => tag.path === this.$route.path)) {
      return;
    }
    this.toLastView(this.visitedViews, view);
    this.visible = false;
  }
  /**
   * 关闭当前标签
   */
  private closeCurrentTag() {
    TagsViewModule.delView(this.selectedTag);
    this.toLastView(this.visitedViews, this.selectedTag);
    this.visible = false;
  }
  /**
   * 找下一个标签
   * @param visitedViews
   * @param view
   */
  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath);
    } else {
      if (view.name === "workplace") {
        this.$router.replace({ path: "/workplace" });
      } else {
        this.$router.push("/");
      }
    }
  }
  /**
   * 刷新当前选中的标签
   */
  private refreshSelectedTag() {
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
      visitedViews,
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
      isAffix,
    } = this;
    return (
      <div class="tags-view-container">
        <el-scrollbar class="tags-view-wrapper flex justify-start">
          {visitedViews.map((item) => (
            <el-link
              class={`tags-view-item ${isActive(item)}`}
              href={item.path}
              onContextmenu={(event: MouseEvent) => openMenu(event, item)}
            >
              {item.title}
              {isAffix(item) ? (
                ""
              ) : (
                <el-icon
                  style="margin-left: 5px;"
                  onClick={(event: MouseEvent) => closeTag(event, item)}
                >
                  <i-close />
                </el-icon>
              )}
            </el-link>
          ))}
        </el-scrollbar>
        <ul
          v-show={visible}
          class="contextmenu"
          style={`left: ${left}px;top: ${top}px;`}
        >
          <li onClick={() => refreshSelectedTag()}>刷新</li>
          <li onClick={() => closeCurrentTag()}>关闭</li>
          <li onClick={() => closeOtherTag()}>关闭其他</li>
          <li onClick={() => closeAllTag(this.selectedTag)}>关闭所有</li>
        </ul>
      </div>
    );
  }
}
