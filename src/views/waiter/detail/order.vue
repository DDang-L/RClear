<template>
  <div>
    <!-- 订单信息{{ waiterFindOrderData }} -->

    <!-- 表格 -->
    <div>
      <el-table
        :data="waiterFindOrderData"
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
  </div>
</template>

<script>
import { orderQueryInfoStatus } from "@/api/order.js";
export default {
  data() {
    return {
      waiterId: this.$route.params.id,

      // 该员工的订单信息
      waiterFindOrderData: [],
    };
  },
  computed: {},
  methods: {
    toDetail(row) {
      // console.log(row);
      // 员工订单信息跳转到该员工下的顾客订单信息的详情页面

      this.$router.push(`/orderDetail/${row.id}/detail`);
    },
  },
  created() {
    // 传员工的id
    console.log(this.$route.params.id);
    orderQueryInfoStatus(this.waiterId).then((res) => {
      this.waiterFindOrderData = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>