<template>
  <div>
    <!-- 表格 -->
    <!-- {{ ids }} -->
    <div class="tables">
      <!--  @selection-change="handleSelectionChange" 当复选框发生变化的时候，触发的时间处理程序 -->
      <el-table
        :data="tempData"
        stripe
        style="width: 100%"
        height="calc(100vh - 280px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180">
        </el-table-column>
        <el-table-column prop="total" label="总价" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
        </el-table-column>
        <el-table-column prop="customer.id" label="顾客ID" width="100">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <!-- scope.row一行的对象 -->
          <template slot-scope="scope">
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 前端做分页 -->
    <!-- {{ page }}-----{{ pageSize }} -->
    <div>
      <!--  分页属性值，与数据模型中的对应-->
      <!-- @size-change="handleSizeChange"改变每页条数 -->
      <!-- @current-change="handleCurrentChange" 改变页码 -->
      <!-- addressData.length 数组的长度是total -->
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[5, 6, 7]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="orderData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { orderQueryInfoStatus } from "@/api/order.js";
export default {
  data() {
    return {
      status: "待确认",
      // 待支付订单信息
      orderData: [],

      // 分页器页码从1开始
      page: 1,
      pageSize: 5,
    };
  },
  computed: {
    // 计算属性 表格表上需要换掉:data="tempData"
    tempData() {
      return this.orderData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },
  methods: {
    // 跳转到详情
    toDetail(row) {
      this.$router.push(`/orderDetail/${row.id}/detail`);
    },
  },
  created() {
    orderQueryInfoStatus({ status: this.status }).then((res) => {
      this.orderData = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>