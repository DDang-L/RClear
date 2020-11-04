<template>
  <div>
    <!-- 收益信息{{ waiterProfit }} -->
    <!-- 表格 -->

    <!-- 表格 -->
    <div>
      <!-- stripe斑马表格 size 表格大小-->
      <!-- :data改为数据模型中的list指向的每页顾客信息 -->
      <!-- 原生js给table设置高度table.style.height=calc() -->
      <el-table
        :data="waiterProfit"
        stripe
        style="width: 100%"
        size="mini"
        height="calc(100vh - 180px)"
      >
        <el-table-column prop="id" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="money" label="金额" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="" label="凭证"> </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      waiterId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("waiter", ["waiterProfit"]),
  },
  methods: { ...mapActions("waiter", ["detailsShou"]) },
  created() {
    this.detailsShou({ id: this.waiterId });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>