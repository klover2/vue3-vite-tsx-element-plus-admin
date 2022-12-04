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
  /** 用户token */
  token: string;
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public username = "";
  public userId = "";
  public avatar = "/img/user-avatar.gif";
  public token = "";

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

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    // 在这里进行调登录接口完善需要的信息 这里没有接口 暂时写死 TODO
    this.SET_USERNAME(userInfo.username);
    this.SET_USER_ID("123456789");
    this.SET_AVATAR("/img/user-avatar.gif");
    this.SET_TOKEN("123456789");
  }
}
export const UserModule = getModule(User);
