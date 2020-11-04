<template>
  <div>
    <!-- 所有订单{{ total }}=={{ orderDotal }} -->
    <!-- 表格 -->
    <div>
      <el-table
        :data="orderDotal"
        stripe
        style="width: 100%"
        height="calc(100vh - 250px)"
      >
        <el-table-column prop="id" label="订单编号" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="下单时间"
          width="280"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="total" label="总价" width="200" align="center">
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
        </el-table-column>
        <el-table-column prop="customerId" label="顾客ID" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 5,
      },
    };
  },
  computed: {
    ...mapGetters("order", ["total", "orderDotal"]),
  },
  methods: {
    ...mapActions("order", ["orderQueryPage"]),
    // 详情
    toDetail(row) {
      console.log(row);

      this.$router.push(`/orderDetail/${row.id}/detail`);
    },

    // 分页
    // 每页条数变化事件处理函数
    // pageSize: 10, val =10
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改数据模型中的pageSize,设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      // 发起请求
      this.orderQueryPage(this.queryParams);
    },

    // 当页码发生变化的事件处理程序
    // 当页码发生变化时，若再变化每页条数，则会执行handleSizeChange()、handleCurrentChange()俩个函数
    // queryParams.page:0, val=0
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 修改数据模型中的数据并发起请求
      this.queryParams.page = val;
      // 发起请求
      this.orderQueryPage(this.queryParams);
    },
  },
  created() {
    this.orderQueryPage(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>