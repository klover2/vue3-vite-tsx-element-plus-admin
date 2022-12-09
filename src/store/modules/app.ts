import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface IAppState {
  language: string;
}

/**
 * 全局配置
 */
@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public language = sessionStorage.getItem("localeLang") || "zhCn";

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language;
    sessionStorage.setItem("localeLang", language);
  }

  @Action
  public setLanguage(language: string) {
    this.SET_LANGUAGE(language);
  }
}

export const AppModule = getModule(App);
