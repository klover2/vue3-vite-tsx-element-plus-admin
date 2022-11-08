import { Options, Vue } from "vue-class-component";
import "@/styles/login.less";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

@Options({
  name: "login",
})
export default class extends Vue {
  private ruleFormRef = ref<FormInstance>();
  private ruleForm = reactive({
    username: "admin",
    password: "admin",
  });

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
          <el-form-item prop="username">
            <span class="svg-container">
              <el-icon>
                <i-user />
              </el-icon>
            </span>
            <el-input
              ref="username"
              v-model={ruleForm.username}
              placeholder="请输入账号"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>
        </el-form>
      </div>
    );
  }
}
