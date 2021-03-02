<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        :wrapper-col="wrapperCol"
      >
      
        <label>用户名：</label>
        <a-form-item>
          <a-input type="text" autocomplete="off" style="width:100%" />
        </a-form-item>
        <label>密码：</label>
        <a-form-item>
          <a-input type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item>
          <captch />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block>登录</a-button>
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
import { reactive, toRefs } from "vue";

  export default {
    name: "Login",
    components: {
      Captch
    },
    setup(props) {
      const formConfig = reactive({
        layout: {
          labelCol: { span: 4 },
          wrapperCol: { span: 24 }
        }
      });

      return {
        ...toRefs(formConfig.layout)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style.scss";
</style>