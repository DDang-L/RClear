<template>
  <div>
    <!-- 导航 -->
    <div>
      <div>
        <el-tabs v-model="activeName">
          <!-- label 选项卡名字 -->
          <!-- <AllOrder /> 单标签使用组件 -->
          <!-- :lazy="true" 点击标签的时候，才拿到顾客id -->
          <el-tab-pane label="所有订单" name="allOrder"
            ><AllOrder
          /></el-tab-pane>
          <el-tab-pane :lazy="true" label="待支付" name="waitPay"
            ><WaitPay
          /></el-tab-pane>
          <el-tab-pane :lazy="true" label="待派单" name="waitActive"
            ><WaitActive></WaitActive
          ></el-tab-pane>
          <el-tab-pane :lazy="true" label="待接单" name="waitAccept"
            ><WaitAccept></WaitAccept
          ></el-tab-pane>
          <el-tab-pane :lazy="true" label="待服务" name="waitService"
            ><WaitService></WaitService
          ></el-tab-pane>
          <el-tab-pane :lazy="true" label="待确认" name="waitSure"
            ><WaitSure></WaitSure
          ></el-tab-pane>
          <el-tab-pane :lazy="true" label="已完成" name="wFinish"
            ><WFinish></WFinish
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 订单 {{ total }}==={{ orderDotal }} -->
  </div>
</template>

<script>
// 导入三个组件，局部注册组件,再使用组件
import AllOrder from "./otherO/allOrder.vue";
import WaitPay from "./otherO/waitPay.vue";
import WaitAccept from "./otherO/waitAccept.vue";
import WaitActive from "./otherO/waitActive.vue";
import WaitService from "./otherO/waitService.vue";
import WaitSure from "./otherO/waitSure.vue";
import WFinish from "./otherO/wFinish.vue";

export default {
  // 局部注册组件
  components: {
    AllOrder,
    WaitPay,
    WaitAccept,
    WaitActive,
    WaitService,
    WaitSure,
    WFinish,
  },
  data() {
    return {
      // 激活选项卡的名字的name值
      activeName: "allOrder",
    };
  },

  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>