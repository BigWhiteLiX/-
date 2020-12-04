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
      <a-breadcrumb-item>商品分类</a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 表格 -->
    <a-table
      :row-key="(record) => record.cat_id"
      :columns="catColumns"
      :data-source="catData"
      :pagination="false"
      :expandIconColumnIndex="1"
      bordered
    >
      <template #index="{ record, index }">
        <span v-if="record.cat_level == 0"> {{ index + 1 }}</span>
      </template>

      <!-- 排序 -->
      <template #idDeleted="{ record }">
        <CheckCircleTwoTone
          v-if="record.cat_deleted == false"
          twoToneColor="#52c41a"
        />
        <CheckCircleTwoTone
          v-if="record.cat_deleted == true"
          twoToneColor="#c41a16"
        />
      </template>

      <!-- 排序 -->
      <template #level="{ record }">
        <a-tag color="blue" v-if="record.cat_level == 0"> 一级 </a-tag>
        <a-tag color="green" v-if="record.cat_level == 1"> 二级 </a-tag>
        <a-tag color="orange" v-if="record.cat_level == 2"> 三级 </a-tag>
      </template>
      <!-- 操作 -->
      <template #operation="{ record }">
        <!-- 编辑 -->
        <a-button type="primary"> <EditOutlined />编辑 </a-button>
        <!-- 删除 -->
        <a-button
          type="danger"
          style="margin: 0 10px"
          @click="handleDeleteUser(record.id)"
        >
          <DeleteOutlined />删除</a-button
        >
      </template>
    </a-table>
  </a-layout>
</template>
<script>
// 引入请求方法 httpGet
import { httpGet } from "@/utils/http";
// 引入请求路径
import { goods } from "@/api";
// 引入菜单小图标
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons-vue";
export default {
  data() {
    return {
      // 表格列配置
      catColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "分类名称", dataIndex: "cat_name" },
        {
          title: "是否有效",
          key: "cat_deleted",
          slots: { customRender: "idDeleted" },
        },
        {
          title: "排序",
          key: "cat_level",
          slots: { customRender: "level" },
        },

        {
          title: "操作",
          key: "operation",
          slots: { customRender: "operation" },
        },
      ],
      catData: [],
      total: 0,
      pagesize: 5,
      pagenum: 1,
    };
  },
  methods: {
    // 获取用户数据
    getCategories() {
      httpGet(goods.GetCategories, {
        type: [1, 2, 3],
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      })
        .then((response) => {
          // console.log(response);
          let { meta, data } = response;
          // 如果后台返回的状态码为200,则代表请求成
          if (meta.status == 200) {
            // 设置表格数据
            this.catData = data.result;
            // 设置数据总数
            this.total = data.total;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getCategories();
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    CheckCircleTwoTone,
  },
};
</script>

<style>
</style>