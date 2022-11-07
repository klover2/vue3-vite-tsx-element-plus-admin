import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "..";

export interface ITagView {
  title?: string;
  path?: string;
  name?: string;
}

export interface ITagsViewState {
  tags: ITagView[];
}

/**
 * vuex-module-decorators
 * 使用文档介绍 https://championswimmer.in/vuex-module-decorators/pages/installation.html
 */
@Module({ dynamic: true, store, name: "tagsView" })
class TagsView extends VuexModule implements ITagsViewState {
  public tags: ITagView[] = [];

  @Mutation
  private _addView(view: ITagView) {
    this.tags.push(view);
  }

  @Action
  public addView(view: ITagView) {
    this._addView(view);
  }
}

export const TagsViewModule = getModule(TagsView);
