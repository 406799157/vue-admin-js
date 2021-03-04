<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="regisForm"
        :wrapper-col="layout.wrapperCol"
        :model="regisInfo"
        :rules="registerRules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
      
        <label>用户名：</label>
        <a-form-item has-feedback name="username">
          <a-input type="text" :maxLength="11" v-model:value="regisInfo.username" autocomplete="off" />
        </a-form-item>
        <label>密码：</label>
        <a-form-item has-feedback name="password">
          <a-input-password :maxLength="20" v-model:value="regisInfo.password" autocomplete="off" />
        </a-form-item>
        <label>确认密码：</label>
        <a-form-item has-feedback name="passwords">
          <a-input-password :maxLength="20" v-model:value="regisInfo.passwords" autocomplete="off" />
        </a-form-item>
        <label>验证码：</label>
        <a-row :gutter=10>
          <a-col :span=14>
            <a-form-item has-feedback name="verifyCode">
              <a-input type="text" :maxLength="6" v-model:value="regisInfo.verifyCode" autocomplete="off" />
            </a-form-item>
          </a-col>
          <a-col :span=10>
            <a-form-item>
              <a-button type="primary" :disabled="verifyCodeInfo.disabled" :loading="verifyCodeInfo.loading" @click="getVerifyCode()" block>{{ verifyCodeInfo.text }}</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <captch v-model:robotCheck="regisInfo.robotCheck" />
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
import { verifyPhone, verifyPassword, verifyCode } from "@/utils/verify";
import { generateRandomStr } from "@/utils/generateStr";
import { ref, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";

  export default {
    name: "Register",
    components: {
      Captch
    },
    setup(props) {
      const regisForm = ref();
      let formConfig = reactive({
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 24 }
        },
        regisInfo: {
          username: "",
          password: "",
          passwords: "",
          verifyCode: "",
          robotCheck: false
        }
      });
      let verifyCodeInfo = reactive({
        text: "获取验证码",
        timer: undefined,
        sec: 60,
        disabled: false,
        loading: false
      });
      //表单验证func
      let registerRulesFunc = {
        //检查用户名
        async checkUsername(rule, value) {
          if (!verifyPhone(value)) {
            return Promise.reject("请输入正确的用户名（中国大陆11位手机号）");
          }
          return Promise.resolve();
        },
        //检查密码
        async checkPassword(rule, value) {
          if (!verifyPassword(value)) {
            return Promise.reject("请输入正确的密码（6-20位数字与字母组合）");
          }
          if (formConfig.regisInfo.passwords) {
            regisForm.value.validateField("passwords");
          }
          return Promise.resolve();
        },
        //检查再次输入的密码
        async checkPasswords(rule, value) {
          if(!verifyPassword(value)) {
            return Promise.reject("请输入正确的密码（6-20位数字与字母组合）");
          }
          if(value != formConfig.regisInfo.password) {
            return Promise.reject("两次输入的密码不一致");
          }
          return Promise.resolve();
        },
        //检查验证码
        async checkCode(rule, value) {
          if(!verifyCode(value)) {
            return Promise.reject("验证码输入错误");
          }
          return Promise.resolve();
        }
      }
      //表单验证
      const registerRules = {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" },{ validator: registerRulesFunc.checkUsername, trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },{ validator: registerRulesFunc.checkPassword, trigger: "blur" }],
        passwords: [{ required: true, message: "请再次输入密码", trigger: "blur" },{ validator: registerRulesFunc.checkPasswords, trigger: "blur" }],
        verifyCode: [{ required: true, message: "请输入验证码", trigger: "blur" },{ validator: registerRulesFunc.checkCode, trigger: "change" }],
      };
      //获取验证码
      const getVerifyCode = () => {
        if(verifyCodeInfo.timer) {
          message.destroy();
          message.info("等待倒计时结束后重试");
          return;
        }
        verifyCodeInfo.loading = true;
        verifyCodeInfo.text = "发送中";
        setTimeout(() => {
          verifyCodeInfo.loading = false;
          verifyCodeInfo.text = (-- verifyCodeInfo.sec) + "秒后重试";
          message.success("验证码发送成功");
          message.info("验证码是：" + generateRandomStr(6, { num: true, lower: false, upper: true}));
          verifyCodeInfo.timer = setInterval(() => {
            verifyCodeInfo.sec --;
            verifyCodeInfo.text = verifyCodeInfo.sec + "秒后重试";
            if (verifyCodeInfo.sec <= 1) {
              clearInterval(verifyCodeInfo.timer);
              verifyCodeInfo.timer = undefined;
              verifyCodeInfo.sec = 60;
              verifyCodeInfo.text = "获取验证码";
            }
          }, 1000);
        }, 1000);
      }
      //表单完成
      let handleFinish = (value) => {
        if(!formConfig.regisInfo.robotCheck) {
          message.destroy();
          message.warning("请通过人机验证");
          handleFinishFailed();
          return;
        }
        console.log("表单提交成功");
        console.log(value);
      };
      //表单提交失败
      let handleFinishFailed = () => {
        console.log("表单提交失败");
      };
      return {
        ...toRefs(formConfig),
        verifyCodeInfo,
        getVerifyCode,
        regisForm,
        registerRules,
        handleFinish,
        handleFinishFailed
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>