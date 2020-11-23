<template>
  <a-layout class="home">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="home-logo">
        <router-link to="/welcome">
          <img src="@/assets/logo.png" alt="" />
          <span>后台管理系统</span>
        </router-link>
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :openKeys="openKeys"
        @openChange="onOpenChange"
      >
        <!-- 一级菜单渲染 -->
        <a-sub-menu
          v-for="(item, index) in menusList"
          :index="index"
          :key="item.id"
        >
          <template #title v-if="item.path == 'users'">
            <span
              ><user-outlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'rights'">
            <span
              ><CodeSandboxOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'goods'">
            <span
              ><ShoppingOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'orders'">
            <span
              ><ContainerOutlined /><span>{{ item.authName }}</span></span
            >
          </template>
          <template #title v-else-if="item.path == 'reports'">
            <span
              ><AreaChartOutlined /><span>{{ item.authName }}</span></span
            >
          </template>

          <!-- 二级菜单渲染 -->
          <a-menu-item
            v-for="(subitem, subindex) in item.children"
            :subindex="subindex"
            :key="subitem.id"
          >
            <AppstoreOutlined />
            <span>
              <router-link :to="subitem.path" style="color: #fff">{{
                subitem.authName
              }}</router-link>
            </span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
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
        <a-button @click="handleLogOut" style="float: right; margin: 16px 12px"
          >退出</a-button>    
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  AppstoreOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CodeSandboxOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  AreaChartOutlined,
} from "@ant-design/icons-vue";

import { httpGet } from "../utils/http";
import { rights } from "../api";

export default {
  data() {
    return {
      collapsed: false,
      menusList: [],
      //默认打开的那一项
      openKeys: [],
      // 所有项
      rootSubmenuKeys: [],
    };
  },
  created() {
    this.getMenus();
  },
  components: {
    AppstoreOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CodeSandboxOutlined,
    ShoppingOutlined,
    ContainerOutlined,
    AreaChartOutlined,
  },

  methods: {
    // 退出功能
    handleLogOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    // 侧边栏
    getMenus() {
      httpGet(rights.AsideMenus)
        // 成功时的回调
        .then((res) => {
          // console.log(res);
          let { data, meta } = res;
          if (meta.status == 200) {
            this.menusList = data;
            // 保存一级菜单
            this.menusList.forEach((item) => {
              this.rootSubmenuKeys.push(item.id);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击当前，关闭其他菜单
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>

<style>
.home {
  height: 100%;
}
.home-logo {
  height: 32px;
  background: color #1890ff;
  margin: 16px;
  overflow: hidden;
}
.home-logo img {
  height: 100%;
  margin-right: 20px;
}
.home-logo span {
  color: #fff;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
</style>
