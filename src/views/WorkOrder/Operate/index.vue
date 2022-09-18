<template>
  <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工单编号">
          <el-input v-model="formInline.user" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工单状态">
          <el-select v-model="formInline.region" placeholder="请选择">
            <el-option label="代办" value="shanghai"></el-option>
            <el-option label="进行" value="beijing"></el-option>
            <el-option label="取消" value="beijing"></el-option>
            <el-option label="完成" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <div class="result"><addBtn class="orBtn" /> <workorderSetting /></div>
      <div class="table">
        <tableCom :OrderList="WorkOrderList" />
      </div>
    </div>
  </div>
</template>

<script>
import addBtn from "../../components/addBtn.vue";
import workorderSetting from "../../components/workorderSetting.vue";
import tableCom from "../../components/table.vue";
import { getWorkOrderList } from "@/api/workorder";
export default {
  components: {
    addBtn,
    workorderSetting,
    tableCom,
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      WorkOrderList: [],
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
    },
    async getWorkOrderList() {
      const res = await getWorkOrderList(1, 10, false);
      // console.log(res.data.currentPageRecords);
      this.WorkOrderList = res.data.currentPageRecords;
      console.log(this.WorkOrderList);
    },
  },

  created() {
    this.getWorkOrderList();
  },
};
</script>

<style scoped>
.main {
  padding: 20px;
}
.search {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  padding-top: 22px;
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  display: flex;
}
.orBtn {
  margin-right: 10px;
}
.title {
  width: 100%;
  height: 42px;
  background-color: #f3f6fb;
}
</style>
