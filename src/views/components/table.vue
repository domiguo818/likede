<template>
  <el-table :data="OrderList" style="width: 100%">
    <el-table-column prop="index" label="序号"> </el-table-column>
    <el-table-column prop="taskCode" label="工单编号"> </el-table-column>
    <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
    <el-table-column prop="taskType.typeName" label="工单类型">
    </el-table-column>
    <el-table-column prop="手动" label="工单方式"> </el-table-column>
    <el-table-column prop="taskStatusTypeEntity.statusName" label="工单状态">
    </el-table-column>
    <el-table-column prop="userName" label="运营人员"> </el-table-column>
    <el-table-column prop="createTime" label="创建日期"> </el-table-column>
    <el-table-column prop="address" label="操作"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  props: {
    OrderList: {
      required: true,
    },
  },
  mounted() {
    console.log(this.OrderList);
  },
};
</script>
