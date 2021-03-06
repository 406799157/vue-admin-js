<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> Mr.Yi
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0" disabled>
          个人信息
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3" @click="logout()">退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
  import { message } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
        message.success('退出登录');
      }
    },
    components: {
      DownOutlined
    },
  };
</script>

<style lang="scss" scoped>
</style>