<template>
  <div>
    <!-- 表格 -->
    <div>
      <!-- stripe斑马表格 size 表格大小-->
      <!-- :data改为数据模型中的list指向的每页顾客信息 -->
      <!-- 原生js给table设置高度table.style.height=calc() -->
      <!-- selection-change当复选框发生变化的时候触发的事件处理程序 -->
      <el-table
        :data="waiterTiXianData"
        stripe
        style="width: 100%"
        size="mini"
        height="calc(100vh - 180px)"
      >
        <el-table-column prop="id" label="编号" width="180"></el-table-column>
        <el-table-column prop="money" label="金额" width="180">
        </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="userId" label="员工ID"> </el-table-column>

        <el-table-column fixed="right" label="凭证" width="150">
          <!-- scope.row一行的对象 -->
          <template slot-scope="scope">
            <el-button @click="toWatch(scope.row)" type="text" size="small"
              >查看凭证</el-button
            >
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <!-- scope.row一行的对象 -->
          <template slot-scope="scope">
            <el-button @click="toCheck(scope.row)" type="text" size="small"
              >已审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div>
      <!--  分页属性值，与数据模型中的对应-->
      <!-- @size-change="handleSizeChange"改变每页条数 -->
      <!-- @current-change="handleCurrentChange" 改变页码 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="waiterTiXianTotal"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
    <!-- 数据模型中的变量title 标题 -->
    <!-- :visible.sync="dialogTableVisible" 控制模态框的显示 true显示 -->
    <el-dialog :title="title" :visible.sync="visible">
      <div class="lineUp"></div>
      <div class="phtoto"></div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        type: "提现",
      },

      title: "凭证",
      visible: false,
    };
  },
  computed: {
    ...mapGetters("waiter", ["waiterTiXianTotal", "waiterTiXianData"]),
  },
  methods: {
    ...mapActions("waiter", ["waiterQueryTiXian"]),

    // 每页条数变化事件处理函数
    // pageSize: 10, val =10
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改数据模型中的pageSize,设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      // 发起请求
      this.waiterQueryTiXian(this.queryParams);
    },

    // 当页码发生变化的事件处理程序
    // 当页码发生变化时，若再变化每页条数，则会执行handleSizeChange()、handleCurrentChange()俩个函数
    // queryParams.page:0, val=0
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 修改数据模型中的数据并发起请求
      this.queryParams.page = val;
      // 发起请求
      this.waiterQueryTiXian(this.queryParams);
    },

    // 查看凭证
    toWatch() {
      this.visible = true;
    },
  },
  created() {
    this.waiterQueryTiXian(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.lineUp {
  width: 650px;
  border: 1px solid rgb(228, 225, 225);
  margin: 0 auto;
}
.phtoto {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  margin: 20px auto;
}
</style>