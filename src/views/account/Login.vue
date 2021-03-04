<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="loginForm"
        :wrapper-col="layout.wrapperCol"
        :model="loginInfo"
        :rules="loginRules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
      
        <label>用户名：</label>
        <a-form-item has-feedback name="username">
          <a-input type="text" :maxLength="11" v-model:value="loginInfo.username" autocomplete="off" style="width:100%" />
        </a-form-item>
        <label>密码：</label>
        <a-form-item has-feedback name="password">
          <a-input-password :maxLength="20" v-model:value="loginInfo.password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <captch v-model:robotCheck="loginInfo.robotCheck" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center color-white">
        <a href="" class="color-white fs-12">找回密码</a> | 
        <router-link to="/register" class="color-white fs-12">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Captch from "@/components/captch/Captch.vue";
import { verifyPhone, verifyPassword, verifyCode } from "@/utils/verify";
import { reactive, ref, toRefs } from "vue";

  export default {
    name: "Login",
    components: {
      Captch
    },
    setup(props) {
      const loginForm = ref();
      const formConfig = reactive({
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 24 }
        },
        loginInfo: {
          username: "",
          password: "",
          robotCheck: false
        }
      });
      const loginRulesFunc = {
        async checkUsername(rule, value) {
          if (!verifyPhone(value)) {
            return Promise.reject("用户名不正确");
          }
          return Promise.resolve();
        },
        async checkPassword(rule, value) {
          if (!verifyPassword(value)) {
            return Promise.reject("密码输入不正确");
          }
          return Promise.resolve();
        }
      }
      const loginRules = {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }, { validator: loginRulesFunc.checkUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur"}, { validator: loginRulesFunc.checkPassword, trigger: "blur" }]
      }
      let handleFinish = value => {
        if(!formConfig.loginInfo.robotCheck) {
          message.destroy();
          message.warning("请通过人机验证");
          handleFinishFailed();
          return;
        }
        console.log("表单提交成功");
        console.log(value);
      }
      let handleFinishFailed = () => {
        console.log("表单提交失败");
      }
      return {
        ...toRefs(formConfig),
        loginForm,
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