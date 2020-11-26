<template>
  <a-breadcrumb style="margin: 16px">
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>权限管理</a-breadcrumb-item>
    <a-breadcrumb-item>权限列表</a-breadcrumb-item>
  </a-breadcrumb>
  <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
    <a-table
      :columns="rightsColumns"
      :data-source="rightsData"
      bordered
      :row-key="(record) => record.id"
      :pagination="false"
    >
      <template #index="{ index }">
        {{ index + 1 }}
      </template>
      <template #level="{ record }">
        <a-tag v-if="record.level == 0" color="blue">一级</a-tag>
        <a-tag v-else-if="record.level == 1" color="green">二级</a-tag>
        <a-tag v-else-if="record.level == 2" color="orange">三级</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>
import { rights } from "@/api";
// 导入请求方式
import {} from "@/utils/http";
import { httpGet } from "../utils/http";
export default {
  data() {
    return {
      rightsColumns: [
        { title: "#", key: "index", slots: { customRender: "index" } },
        { title: "权限名称", dataIndex: "authName" },
        { title: "路径", dataIndex: "path" },
        {
          title: "权限等级",
          //   key: "level",
          dataIndex: "record",
          slots: { customRender: "level" },
        },
      ],
      rightsData: [],
    };
  },
  created() {
    this.handleReadRigths();
  },
  methods: {
    handleReadRigths() {
      httpGet(rights.GetRights)
        .then((res) => {
          //   console.log(res);
          let { data, meta } = res;
          if (meta.status == 200) {
            // 设置表格数据
            this.rightsData = data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.ant-tag {
  padding: 2px 14px;
  font-size: 14px;
}
</style>