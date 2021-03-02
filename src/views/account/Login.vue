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
          <a-button type="primary" block>Submit</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center color-white">
        <a href="" class="color-white fs-12">找回密码</a> | 
        <a href="" class="color-white fs-12">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
  export default {
    name: "Login",
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