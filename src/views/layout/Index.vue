<template>
  <a-layout class="app-wapper">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="app-sider">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" class="app-header">
        <a-row>
          <a-col>
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          </a-col>
          <a-col>
            <a-avatar />
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
  import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  } from '@ant-design/icons-vue';
  import { defineComponent, ref } from 'vue';
  import AAvatar from './components/Avatar.vue';
  export default defineComponent({
    components: {
      UserOutlined,
      VideoCameraOutlined,
      UploadOutlined,
      MenuUnfoldOutlined,
      MenuFoldOutlined,
      AAvatar
    },

    setup() {
      return {
        selectedKeys: ref(['1']),
        collapsed: ref(false),
      };
    },
  });
</script>

<style lang="scss" scoped>
  .app-wapper {
    height: 100vh;
    .app-sider {
      left: 0;
      overflow: auto;
      .logo {
        background-image: url("~@/assets/logo.png");
        background-size: 100%;
        height: 100px;
        width: 100px;
        margin: auto;
      }
    }
    .app-header {
      padding: 0;
      background-color: #fff;
      .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 6px;
        cursor: pointer;
        transition: color 0.3s;
      }:hover{
        color: #1890ff
      }
      .ant-row {
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
      }
    }
  }
</style>