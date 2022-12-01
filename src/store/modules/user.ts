import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface IUserState {
  /** 用户名称 */
  username: string;
  /** 用户id */
  userId: string;
  /** 头像 */
  avatar: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public username = "";
  public userId = "";
  public avatar = "/img/user-avatar.gif";

  @Mutation
  private SET_USERNAME(username: string) {
    this.username = username;
  }

  @Mutation
  private SET_USER_ID(userId: string) {
    this.userId = userId;
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    // 在这里进行调登录接口完善需要的信息 这里没有接口 暂时写死 TODO
    this.SET_USERNAME(userInfo.username);
    this.SET_USER_ID("123456789");
    this.SET_AVATAR("/img/user-avatar.gif");
  }
}
export const UserModule = getModule(User);
