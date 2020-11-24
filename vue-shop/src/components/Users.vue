<template>
  <a-layout>
    <a-breadcrumb style="margin: 16px">
      <a-breadcrumb-item>首页</a-breadcrumb-item>
      <a-breadcrumb-item>用户管理</a-breadcrumb-item>
      <a-breadcrumb-item>用户列表</a-breadcrumb-item>
    </a-breadcrumb>

    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
      <a-form>
        <a-row>
          <a-col :span="12">
            <a-row :gutter="16">
              <a-col :span="16">
                <a-form-item :wrapperCol="{ span: 24 }">
                  <a-input-search placeholder="请输入内容" size="large" />
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-button type="primary" size="large" @click="showModal">
                  添加用户
                </a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-form>

      <!-- 表格start -->
      <a-table
        :row-key="(record) => record.id"
        :columns="tableList"
        :data-source="tableData"
        bordered
        :pagination="false"
      >
        <template #mg_state="{ text }">
          <a-switch :checked="text.mg_state" />
        </template>

        <template #operation>
          <a-button type="primary">
            <EditOutlined />
          </a-button>
          <a-button type="primary" style="margin: 0 10px">
            <DeleteOutlined />
          </a-button>
          <a-button
            type="primary"
            style="background-color: #e6a23c; color: #fff"
          >
            <SettingOutlined />
          </a-button>
        </template>
      </a-table>
      <!-- 表格start -->
      <a-pagination
        style="margin-top: 25px"
        show-size-changer
        :page-size-options="pageSizeOptions"
        v-model:current="current"
        v-model:pageSize="pageSize"
        :total="total"
        @showSizeChange="onShowSizeChange"
        :show-total="(total) => `共 ${total}条`"
        @change="onChange"
        show-quick-jumper
        :defaultPageSize="2"
      />
    </div>
    <!-- 添加用户遮罩层start -->
    <a-modal
      title="添加用户"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      okText="确定"
      cancelText="取消"
      @ok="handleAddUser"
      @cencel="cancelAddUser"
    >
      <a-form :model="addFormModel" :rules="addFormRules" ref="addFormRef">
        <a-row>
          <a-col :span="24">
            <!-- 用户名 -->
            <a-form-item
              required
              has-feedback
              label="用户名"
              name="username"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="addFormModel.username" />
            </a-form-item>
            <!-- 密码 -->
            <a-form-item
              required
              has-feedback
              label="密码"
              name="password"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input-password
                type="text"
                v-model:value="addFormModel.password"
              />
            </a-form-item>
            <!-- 邮箱 -->
            <a-form-item
              required
              has-feedback
              label="邮箱"
              name="email"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="addFormModel.email" />
            </a-form-item>
            <!-- 手机号 -->
            <a-form-item
              required
              has-feedback
              label="手机号"
              name="mobile"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" v-model:value="addFormModel.mobile" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 添加用户遮罩层end -->
  </a-layout>
</template>

<script>
import { httpGet, httpPost } from "@/utils/http";
import { user } from "@/api";
import { message } from "ant-design-vue";
// 引入菜单小图标
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

export default {
  data() {
    // 自定义表单校验email
    let checkEmail = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入您的邮箱");
      } else if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
      ) {
        // 如果邮箱格式错误就提示格式
        return Promise.reject("您的邮箱格式错误");
      } else {
        return Promise.resolve();
      }
    };

    // 自定义表单校验mobile
    let checkMobile = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入您的手机号");
      } else if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
        // 如果邮箱格式错误就提示格式
        return Promise.reject("您的手机号格式错误");
      } else {
        return Promise.resolve();
      }
    };
    return {
      tableList: [
        {
          title: "#",
          dataIndex: "index",
          key: "index",
        },
        {
          title: "姓名",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "邮箱",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "电话",
          dataIndex: "mobile",
          key: "mobile",
        },
        {
          title: "角色",
          dataIndex: "role_name",
          key: "role_name",
        },
        {
          title: "状态",
          key: "mg_state",
          slots: { customRender: "mg_state" },
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      tableData: [],

      // 分页
      current: 1,
      total: 0,
      pageSizeOptions: ["1", "2", "5", "10"],

      // 添加用户弹出框
      visible: false,
      confirmLoading: false,

      // 添加用户模型对象
      addFormModel: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },

      // 添加用户校验对象
      addFormRules: {
        // 给那个字段添加什么规则
        username: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在4-16个字符之间", trigger: "blur" },
        ],
        password: [
          // required 必须的
          // trigger 啥时候触发
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在6-16个字符之间", trigger: "blur" },
        ],
        email: [{ validator: checkEmail, trigger: "change" }],
        mobile: [{ validator: checkMobile, trigger: "change" }],
      },
    };
  },
  created() {
    // 调用获取用户数据的方法
    this.getUsers();
  },
  methods: {
    // 添加用户

    getUsers(pagenum = 1, pagesize = 2) {
      httpGet(user.GetUsers, {
        pagenum: pagenum,
        pagesize: pagesize,
      })
        .then((res) => {
          let { data, meta } = res;
          if (meta.status == 200) {
            // 设置表格数据
            this.tableData = data.users;
            // 设置当前页码
            this.current = data.pagenum;
            // 设置数据总数
            this.total = data.total;
            this.tableData.forEach((ele, index) => {
              ele.index = index + 1;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    onShowSizeChange(current, pagesize) {
      this.getUsers(current, pagesize);
    },
    onChange(page, pagesize) {
      this.getUsers(page, pagesize);
    },
    // 点击添加按钮显示遮罩层
    showModal() {
      this.visible = true;
    },
    // 点击确定，添加用户
    handleAddUser() {
      this.$refs.addFormRef
        .validate()
        .then(() => {
          // 获取请求参数
          let params = {
            username: this.addFormModel.username,
            password: this.addFormModel.password,
            email: this.addFormModel.username,
            mobile: this.addFormModel.password,
          };
          // 获取请求地址，使用post请求发起ajax
          httpPost(user.AddUser, params)
            .then((res) => {
              // console.log(res);
              let { data, meta } = res;
              if (meta.status == 201) {
                console.log(data);
                this.visible = false;
                // 清空表单中的输入框
                this.$refs.addFormRef.resetFields();
                message.succsess(meta.msg);
                let pagenum = this.current;
                let pagesize = this.pagesize;
                this.getUsers(pagenum, pagesize);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    // 点击取消，清空输入框
    cencelAddUser() {
      // 清空表单中的输入框
      this.$refs.addFormRef.resetFields();
    },
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    SettingOutlined,
  },
};
</script>

<style>
</style>