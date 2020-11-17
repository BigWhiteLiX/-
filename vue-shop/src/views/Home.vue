<template>
  <!-- hoem页面 start   -->
  <a-layout class="home">
    <!-- 侧边栏start -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="home-logo">
        <router-link to="/home">
          <img src="@/assets/logo.png" alt="" /><span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu theme="dark" mode="inline">
        <a-sub-menu key="sub1">
          <template #title>
            <span><user-outlined /><span>用户管理</span></span>
          </template>
          <a-menu-item key="1">
            <AppstoreOutlined /><span
              ><router-link to="/userlist">用户列表</router-link>
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <!-- 侧边栏end -->
    <!-- 内容区域start -->

    <!-- 内容区域的头部start -->
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button style="float: right; margin: 16px 24px" @click="handleBack"
          >退出</a-button
        >
      </a-layout-header>
      <!-- 内容区域的头部end -->
      <!-- 内容区域内容部分start -->
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <!-- 内容区域内容部分end -->
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>

  <!-- hoem页面 end   -->
</template>

<script>
import {
  UserOutlined,
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";

export default {
  data() {
    return {
      // 折叠
      collapsed: false,
      // selectedKeys: ["1"],
    };
  },
  methods: {
    // 退出
    handleBack() {
      // 删除token
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  components: {
    UserOutlined,
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
};
</script>

<style>
.home {
  height: 100%;
}
.home-logo {
  height: 32px;
  margin: 16px;
  overflow: hidden;
}
.home-logo a {
  display: block;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.65);
  margin-left: 10px;
}
.home-logo img {
  height: 100%;
  margin-right: 10px;
}

.ant-layout-sider-collapsed .home-logo span {
  display: none;
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>