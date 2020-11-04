<template>
  <div>
    <el-button type="text" @click="toBack">返回</el-button>

    <el-tabs v-model="activeName">
      <!-- label 选项卡名字 -->
      <!-- <info /> 单标签使用组件 -->
      <!-- :lazy="true" 点击标签的时候，才拿到顾客id -->
      <el-tab-pane :lazy="true" label="基本信息" name="info"
        ><Info
      /></el-tab-pane>
      <el-tab-pane :lazy="true" label="订单信息" name="order"
        ><Order
      /></el-tab-pane>
      <el-tab-pane :lazy="true" label="收益信息" name="profit"
        ><Profit></Profit
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入三个组件，局部注册组件,再使用组件
import Info from "./info.vue";
import Order from "./order.vue";
import Profit from "./profit.vue";
export default {
  components: {
    Info,
    Order,
    Profit,
  },
  data() {
    return {
      // 激活选项卡的名字
      activeName: "info",
    };
  },
  computed: {},
  methods: {
    // 返回
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>