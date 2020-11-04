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
      <el-tab-pane :lazy="true" label="服务地址" name="address"
        ><Address></Address
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 导入三个组件，局部注册组件,再使用组件
import Info from "./info.vue";
import Order from "./order.vue";
import Address from "./address.vue";
export default {
  components: {
    Info,
    Order,
    Address,
  },
  data() {
    return {
      // 激活的选项卡name值
      activeName: "info",
    };
  },
  computed: {},
  methods: {
    //   返回按钮
    toBack() {
      // 路由器对象
      this.$router.go(-1);
    },
  },
  created() {
    //获取动态路由参数
    // params 对象有顾客id值
    console.log(this.$route.params.id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>