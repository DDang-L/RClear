<template>
  <div class="options">
    <el-button type="text" @click="toBack">返回</el-button>

    <!-- {{ orderByIdData }} -->

    <div>订单编号：{{ orderByIdData.id }}</div>
    <div>下单时间：{{ orderByIdData.orderTime }}</div>
    <div>订单状态：{{ orderByIdData.status }}</div>
    <div>员工编号：{{ orderByIdData.id }}</div>
    <div>顾客：{{ orderByIdData.customerId }}</div>
    <div>顾客手机号：{{ orderByIdData.customer.telephone }}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("order", ["orderByIdData"]),
  },
  methods: {
    ...mapActions("order", ["orderFindById"]),
    //   返回按钮
    toBack() {
      // 路由器对象
      this.$router.go(-1);
    },
  },
  created() {
    // 顾客的订单编号
    console.log(this.$route.params.id);

    this.orderFindById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.options {
  & > * {
    margin: 10px 0;
  }
}
</style>