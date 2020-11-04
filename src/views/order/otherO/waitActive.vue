<template>
  <div>
    <!-- {{ orderId }} -->
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
            <el-button @click="toActive(scope.row)" type="text" size="small"
              >派单</el-button
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
        :page-sizes="[5, 6, 7, 10]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="orderData.length"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <!-- 遍历生成单选按钮，并把员工展示出来 -->
      <!-- v-model="waiterId" v-model的waiterId的数据来源是数据模型中的waiterId,再显示到页面上；当页面的选择改变的时候，v-model更新值，后在改变data中的waiterId-->
      <!-- {{ waiterId }} -->
      <el-radio-group v-model="waiterId" @change="changeWaiter">
        <el-radio
          v-for="(item, index) in waiterData"
          :label="item.id"
          :key="index"
          >{{ item.username }}</el-radio
        >
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { orderQueryInfoStatus, sendOrder } from "@/api/order.js";
import { waiterFindAllAll } from "@/api/waiter.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      status: "待派单",
      // 待支付订单信息
      orderData: [],

      // 分页器页码从1开始
      page: 1,
      pageSize: 10,

      visible: false,
      title: "派单",

      // 员工信息
      waiterData: [],

      // 订单Id
      orderId: "",
      // 员工id
      waiterId: "",
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

    // 派单
    toActive(row) {
      // console.log(row, "111");
      // 订单id 存到数据模型中 派单接口时使用
      this.orderId = row.id;

      waiterFindAllAll().then((res) => {
        // console.log(res.data, "+++");
        let resdata = res.data.filter((item) => {
          return (item.status = "启用");
        });

        // console.log(resdata);
        this.waiterData = resdata;
        this.visible = true;
      });
    },

    // 确定按钮
    toSave() {
      // 派单
      sendOrder({
        waiterId: this.waiterId,
        orderId: this.orderId,
      }).then((res) => {
        // console.log(res, "派单成功");
        // 刷新数据
        orderQueryInfoStatus({ status: this.status }).then((res) => {
          // console.log("嘻嘻嘻");
          this.orderData = res.data;
        });
        this.visible = false;
      });
    },
  },
  created() {
    // 查询待派单的订单
    orderQueryInfoStatus({ status: this.status }).then((res) => {
      this.orderData = res.data;
    });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>