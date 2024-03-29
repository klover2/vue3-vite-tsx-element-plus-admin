import { Options, Vue } from "vue-class-component";
import "@/styles/login.scss";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { UserModule } from "@/store/modules/user";

@Options({
  name: "Login",
})
export default class extends Vue {
  private ruleFormRef = ref<FormInstance>();
  private ruleForm = reactive({
    username: "admin",
    password: "admin",
  });
  // 是否隐藏密码
  private isHidePwd = true;
  private isLoading = false;

  private setIsHidePwd(isHidePwd: boolean) {
    this.isHidePwd = !isHidePwd;
  }

  // 登录
  private async login() {
    this.isLoading = true;
    await UserModule.Login(this.ruleForm);
    this.$router.replace({
      path: "/",
    });
  }

  public render(): JSX.Element {
    const { ruleFormRef, ruleForm } = this;
    return (
      <div class="login-container">
        <el-form
          ref={ruleFormRef}
          model={ruleForm}
          label-width="0px"
          class="login-form"
          status-icon
        >
          <div class="title-container">
            <h3 class="title"> Admin 系统登录 </h3>
          </div>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model={ruleForm.username}
              placeholder="请输入账号"
              name="username"
              type="text"
              tabindex="1"
              size="large"
              autocomplete="on"
              prefix-icon={() => <svg-icon name="user" />}
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model={ruleForm.password}
              placeholder="请输入账号"
              name="password"
              type={this.isHidePwd ? "password" : "text"}
              tabindex="1"
              size="large"
              autocomplete="on"
              prefix-icon={() => <svg-icon name="password" />}
              suffix-icon={() => (
                <svg-icon
                  name={this.isHidePwd ? "eye-off" : "eye-on"}
                  onclick={() => this.setIsHidePwd(this.isHidePwd)}
                />
              )}
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="button"
              loading={this.isLoading}
              onclick={() => this.login()}
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    );
  }
}
