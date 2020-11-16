<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout-content>
      <a-row>
        <a-col :span="6" :offset="9">
          <!-- 登录表单start -->
          <a-form :rules="rules" :model="form" ref="loginForm">
            <!-- 登录标题start -->
            <a-row class="login-title">
              <a-col :span="24">
                <h2><img src="../assets/logo.png" alt="" />Manage System</h2>
                <span> Ant Design 是西湖区最具影响力的 Web 设计规范 </span>
              </a-col>
            </a-row>
            <!-- 登录标题end -->

            <!-- 登录方式start -->
            <a-row>
              <a-col :span="24">
                <a-tabs :tabBarStyle="{ textAlign: 'center' }">
                  <a-tab-pane key="1" tab="账号密码登录">
                    <!-- 用户名 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="username">
                      <a-input
                        placeholder="请输入用户名"
                        size="large"
                        type="username"
                        v-model:value="form.username"
                      >
                        <template #prefix
                          ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 密码 -->
                    <a-form-item :wrapperCol="{ span: 24 }" name="password">
                      <a-input-password
                        placeholder="请输入密码"
                        size="large"
                        type="password"
                        v-model:value="form.password"
                      >
                        <template #prefix
                          ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input-password>
                    </a-form-item>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="手机号登录" force-render>
                    <!-- 手机号 -->
                    <a-form-item :wrapperCol="{ span: 24 }">
                      <a-input
                        placeholder="请输入手机号"
                        size="large"
                        type="phone"
                      >
                        <template #prefix
                          ><MobileOutlined style="color: rgba(0, 0, 0, 0.25)"
                        /></template>
                      </a-input>
                    </a-form-item>
                    <!-- 验证码 -->
                    <a-row :gutter="16">
                      <a-col :span="16">
                        <a-form-item :wrapperCol="{ span: 24 }">
                          <a-input
                            placeholder="请输入验证码"
                            size="large"
                            type="code"
                          >
                            <template #prefix
                              ><MailOutlined style="color: rgba(0, 0, 0, 0.25)"
                            /></template>
                          </a-input>
                        </a-form-item>
                      </a-col>
                      <a-col :span="8">
                        <a-button block size="large"> 获取验证码 </a-button>
                      </a-col>
                    </a-row>
                  </a-tab-pane>
                </a-tabs>
              </a-col>
            </a-row>
            <!-- 登录方式end -->

            <!-- 忘记密码start -->
            <a-row>
              <a-col :span="24">
                <a-checkbox> 自动登录 </a-checkbox>
                <router-link to="#" style="float: right"
                  >忘记密码？</router-link
                >
              </a-col>
            </a-row>
            <!-- 忘记密码end -->
            <!-- 确定按钮start -->
            <a-row style="margin-top: 24px">
              <a-col :span="24">
                <a-button type="primary" block size="large" @click="onSubmit">
                  确认</a-button
                >
              </a-col>
            </a-row>
            <!-- 确定按钮end -->
            <!-- 其他登录方式 start-->
            <a-row style="margin-top: 24px">
              <a-col :span="24">
                <span>其他登录方式 </span
                ><AlipayCircleOutlined class="item-icon" />
                <TaobaoCircleOutlined class="item-icon" />
                <WeiboCircleOutlined class="item-icon" />
                <router-link to="#" style="float: right">注册账户</router-link>
              </a-col>
            </a-row>
            <!-- 其他登录方式 end-->
          </a-form>
          <!-- 登录表单end -->
        </a-col>
      </a-row>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    UserOutlined,
    LockOutlined,
    MobileOutlined,
    MailOutlined,
    AlipayCircleOutlined,
    TaobaoCircleOutlined,
    WeiboCircleOutlined,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 4,
            max: 15,
            message: "请输入4-15个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "请输入4-16个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          console.log("values", this.form);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
};
</script>

<style scoped>
.ant-layout {
  height: 100%;
  background-image: url(../assets/image/bg.svg);
}
.ant-layout-header {
  background-color: transparent;
  height: 100px;
}
.ant-form {
  width: 365px;
  margin: 0 auto;
}
.login-title {
  text-align: center;
}
.login-title h2 {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  position: relative;
  top: 2px;
}
.login-title img {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
  border-style: none;
}
.login-title span {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  position: relative;
  top: 4px;
  margin: 0 5px;
}

.item-icon:hover {
  color: #1890ff;
}
</style>