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
    >
      <a-form :model="addFormModel" :rules="addFormRules">
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
              <a-input type="text" />
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
              <a-input-password type="text" />
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
              <a-input type="text" />
            </a-form-item>
            <!-- 手机号 -->
            <a-form-item
              required
              has-feedback
              label="手机号"
              name="phone"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="text" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 添加用户遮罩层end -->
  </a-layout>
</template>

<script>
import { httpGet } from "@/utils/http";
import { user } from "@/api";
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
        !/^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.text(
          value
        )
      ) {
        return Promise.reject("您的邮箱格式错误");
      } else {
        return Promise.resolve();
      }
    };

    // 自定义表单校验mobile

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
        email: [{ validator: checkEmail, trigger: "请输入邮箱" }],
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
    showModal() {
      this.visible = true;
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