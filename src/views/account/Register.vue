<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        :wrapper-col="layout.wrapperCol"
        :model="regisInfo"
        :rules="loginRules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
      
        <label>用户名：</label>
        <a-form-item has-feedback name="username">
          <a-input type="text" v-model:value="regisInfo.username" autocomplete="off" style="width:100%" />
        </a-form-item>
        <label>密码：</label>
        <a-form-item>
          <a-input type="password" v-model:value="regisInfo.password" autocomplete="off" />
        </a-form-item>
        <label>确认密码：</label>
        <a-form-item>
          <a-input type="passwords" v-model:value="regisInfo.passwords" autocomplete="off" />
        </a-form-item>
        <label>验证码：</label>
        <a-form-item>
          <a-row gutter=10>
            <a-col :span=14>
              <a-input type="text" v-model:value="regisInfo.verifyCode" autocomplete="off" />
            </a-col>
            <a-col :span=10>
              <a-button type="primary" block>获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item>
          <captch />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center color-white">
        <a href="" class="color-white fs-12">找回密码</a> | 
        <router-link to="/login" class="color-white fs-12">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Captch from "@/components/captch/Captch.vue";
import { verifyPhone } from "@/utils/verify";
import { reactive, toRefs } from "vue";

  export default {
    name: "Login",
    components: {
      Captch
    },
    setup(props) {
      let formConfig = reactive({
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 24 }
        },
        regisInfo: {
          username: '',
          password: '',
          passwords: '',
          verifyCode: ''
        }
      });
      //表单验证func
      let loginRulesFunc = {
        //检查用户名
        async checkUsername(rule, value) {
          if (!verifyPhone(value)) {
            return Promise.reject("请输入正确的用户名（中国大陆11位手机号）");
          }
          return Promise.resolve();
        }
      }
      //表单验证
      const loginRules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },{ validator: loginRulesFunc.checkUsername, trigger: 'blur' }]
      };
      //表单完成
      let handleFinish = () => {
        console.log('表单提交成功');
        console.log(formConfig.regisInfo);
      };
      //表单提交失败
      let handleFinishFailed = () => {
        console.log('表单提交失败');
      };
      return {
        ...toRefs(formConfig),
        loginRules,
        handleFinish,
        handleFinishFailed
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>