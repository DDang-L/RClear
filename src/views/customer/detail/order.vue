<template>
  <div>
    <!-- 订单 {{ coustomerOrderData }} -->
    <!-- 表格 -->
    <div>
      <el-table
        :data="coustomerOrderData.list"
        stripe
        style="width: 100%"
        height="calc(100vh - 350px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180">
        </el-table-column>
        <el-table-column prop="total" label="总价"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="customerId" label="顾客ID"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <!-- scope.row一行的对象 -->
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
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
        :total="coustomerOrderData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
// 导入api的queryBasicFindAll
// import { queryBasicFindAll } from "@/api/order.js";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        customerId: this.$route.params.id,
      },
    };
  },
  computed: {
    ...mapState("customer", ["coustomerOrderData"]),
  },
  methods: {
    ...mapActions("customer", ["orderQueryPage"]),

    // 详情
    toDetail(row) {
      console.log(row);
    },

    // 条数变化
    handleSizeChange() {
      // 改数据模型中的pageSize,设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.orderQueryPage(this.queryParams);
    },

    // 当前页码
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.orderQueryPage(this.queryParams);
    },
  },
  created() {
    // console.log(this.$route.params.id, "----");
    this.orderQueryPage(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>