import Vuex from "vuex";
import { ITagsViewState } from "./modules/tags-view";
import { IUserState } from "./modules/user";

/**
 * vuex-module-decorators
 * 使用文档介绍 https://championswimmer.in/vuex-module-decorators/pages/installation.html
 */
export interface IRootState {
  tagsView: ITagsViewState;
  user: IUserState;
}

export default new Vuex.Store<IRootState>({});
