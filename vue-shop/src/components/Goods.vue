<template>
  <a-layout>
    <!-- 面包屑导航 -->
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item
        ><router-link to="/home" style="font-weight: bold; color: #000"
          >首页</router-link
        ></a-breadcrumb-item
      >
      <a-breadcrumb-item>商品管理</a-breadcrumb-item>
      <a-breadcrumb-item>商品列表</a-breadcrumb-item>
    </a-breadcrumb>
    <a-form>
      <a-row>
        <a-col :span="12">
          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item :wrapperCol="{ span: 24 }">
                <a-input-search size="large" placeholder="请输入内容" />
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button type="primary" size="large"> 添加用户 </a-button>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-form>

    <!-- 表格 -->
    <a-table
      :row-key="(record) => record.goods_id"
      :columns="goodsColumns"
      :data-source="goodsData"
      :pagination="false"
      bordered
    >
      <template #index="{ index }"> {{ index + 1 }} </template>

      <template #operation="{ record }">
        <!-- 编辑 -->
        <a-button type="primary">
          <EditOutlined />
        </a-button>
        <!-- 删除 -->
        <a-button
          type="danger"
          style="margin: 0 10px"
          @click="handleDeleteUser(record.id)"
        >
          <DeleteOutlined
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
  </a-layout>
</template>

<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";
// 引入请求路径
import { goods } from "@/api";
// 引入菜单小图标
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
export default {
  data() {
    return {
      // 表格列配置
      goodsColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "商品名称", dataIndex: "goods_name" },
        { title: "商品价格", dataIndex: "goods_price" },

        { title: "商品重量", dataIndex: "goods_weight" },
        {
          title: "创建时间",
          dataIndex: "add_time",
        },
        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      // 表格数据
      goodsData: [],
      // 分页
      current: 1,
      pagesize: 10,
      total: 0,
      // 指定每页可以显示多少条
      pageSizeOptions: ["1", "2", "5", "10"],
    };
  },
  methods: {
    // 获取用户数据
    getGoods() {
      httpGet(goods.GetGoods, {
        pagenum: this.current,
        pagesize: this.pagesize,
      })
        .then((response) => {
          // console.log(response);
          let { meta, data } = response;
          // 如果后台返回的状态码为200,则代表请求成
          if (meta.status == 200) {
            // 设置表格数据
            this.goodsData = data.goods;
            // 设置当前页码
            // this.current = data.pagenum;
            // 设置数据总数
            this.total = data.total;
            // 给每条数据添加序号(index)属性
            // this.tableData.forEach((ele, index) => {
            //   ele.index = index + 1;
            // });
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
      this.getGoods(current, pageSize);
    },

    // 页码改变的回调，参数是改变后的页码及每页条数
    handlePageChange(page, pageSize) {
      this.current = page;
      this.getGoods(page, pageSize);
    },
  },
  created() {
    this.getGoods();
  },
  components: {
    EditOutlined,
    DeleteOutlined,
  },
};
</script>

<style>
</style>