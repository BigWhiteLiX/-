<template>
  <a-layout>
    <!-- 面包屑导航 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>订单管理</a-breadcrumb-item>
      <a-breadcrumb-item>订单列表</a-breadcrumb-item>
    </a-breadcrumb>

    <a-card>
      <!-- 添加用户 -->
      <a-row style="margin-bottom: 24px">
        <a-col :span="8">
          <a-input-search size="large" placeholder="请输入内容">
            <template #enterButton>
              <a-button> 搜索 </a-button>
            </template></a-input-search
          >
        </a-col>
      </a-row>
      <a-table
        :row-key="(record) => record.order_id"
        :columns="tableColumns"
        :data-source="tableData"
        :pagination="false"
        bordered
      >
        <template #index="{ index }"> {{ index + 1 }} </template>
        <template #pay_status="{ record }">
          <a-tag color="pink" v-if="record.pay_status == 1">未付款</a-tag>
          <a-tag color="green" v-if="record.pay_status == 0">已付款</a-tag>
        </template>
        <template #operation>
          <!-- 编辑 -->
          <a-button type="primary" @click="handleReadAddress">
            <EditOutlined />
          </a-button>
          <!-- 删除 -->
          <a-button class="ant-green" style="margin: 0 10px">
            <EnvironmentOutlined
          /></a-button>
        </template>
      </a-table>
      <a-pagination
        style="margin-top: 25px"
        v-model:current="current"
        :total="total"
        :show-total="(total) => `共 ${total} 条`"
        show-size-changer
        @showSizeChange="onShowSizeChange"
        :page-size-options="pageSizeOptions"
        :defaultPageSize="2"
        v-model:pageSize="pagesize"
        @change="handlePageChange"
        show-quick-jumper
      />
    </a-card>
    <!-- 修改地址弹框 -->
    <a-modal
      title="修改地址"
      cancelText="取消"
      okText="确定"
      v-model:visible="addressVisible"
      @ok="handleAddress"
      :afterClose="handleResetAddress"
    >
      <a-form
        :model="addressFormModel"
        :rules="addressRules"
        ref="addressFormRef"
      >
        <!-- 省市区/县 -->
        <a-form-item label="省市区/县 " name="province" required>
          <a-cascader
            v-model:value="addressFormModel.province"
            :options="options"
            placeholder="请选择"
          />
        </a-form-item>
        <!-- 详细地址-->
        <a-form-item label="详细地址 " name="detail" required>
          <a-input v-model:value="addressFormModel.detail" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";
import { order } from "@/api";
// 引入菜单小图标
import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons-vue";
import cityData from "../api/citydata";
export default {
  data() {
    return {
      // 表格列配置
      tableColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "订单编号", dataIndex: "order_number" },
        { title: "订单价格", dataIndex: "order_price" },
        {
          title: "是否付款",
          key: "pay_status",
          slots: { customRender: "pay_status" },
        },
        { title: "是否发货", dataIndex: "is_send" },
        {
          title: "下单时间",
          dataIndex: "create_time",
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      // 表格数据
      tableData: [],
      // 分页
      current: 1,
      pagesize: 10,
      total: 0,
      // 指定每页可以显示多少条
      pageSizeOptions: ["1", "2", "5", "10"],
      addressVisible: false,
      addressFormModel: {
        province: [],
        detail: "",
      },
      addressRules: {
        province: {
          type: "array",
          required: true,
          message: "请输入省市地址",
          trigger: "blur",
        },
        detail: { required: true, message: "请输入详细地址", trigger: "blur" },
      },
      options: [],
    };
  },
  created() {
    this.handleReadOrders();
  },
  methods: {
    handleReadOrders() {
      httpGet(order.GetOrders, {
        pagenum: this.current,
        pagesize: this.pagesize,
      })
        .then((response) => {
          // console.log(response);
          let { meta, data } = response;
          // 如果后台返回的状态码为200,则代表请求成
          if (meta.status == 200) {
            // 设置表格数据
            this.tableData = data.goods;
            // 设置当前页码
            this.current = data.pagenum;
            // 设置数据总数
            this.total = data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 根据每页显示多少条数据不同 重新渲染表格
    onShowSizeChange(current, pageSize) {
      console.log(current, pageSize);
      this.current = current;
      // this.pagesize = pagesize
      this.handleReadOrders(current, pageSize);
    },

    // 页码改变的回调，参数是改变后的页码及每页条数
    handlePageChange(page, pageSize) {
      this.current = page;
      this.handleReadOrders(page, pageSize);
    },
    handleReadAddress() {
      this.addressVisible = true;
      this.options = cityData;
    },
    handleAddress() {
      this.$refs.addressFormRef.validate().then(() => {
        this.addressVisible = false;
        // this.$refs.addressFormRef.resetFields();
      });
    },
    handleResetAddress() {
      this.$refs.addressFormRef.resetFields();
    },
  },
  components: {
    EditOutlined,
    EnvironmentOutlined,
  },
};
</script>

<style>
.ant-green {
  background-color: #67c23a;
  color: #fff;
}

.ant-green:hover,
.ant-green:focus {
  background-color: #67c23a;
  color: #fff;
  border-color: transparent;
}
</style>