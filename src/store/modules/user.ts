import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface IUserState {
  username: string;
  userId: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public username = "";
  public userId = "";

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_USER_ID(userId: string) {
    this.userId = userId;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    // 在这里进行调登录接口完善需要的信息 这里没有接口 暂时写死 TODO
    this.SET_USERNAME(userInfo.username);
    this.SET_USER_ID("123456789");
  }
}
export const UserModule = getModule(User);
