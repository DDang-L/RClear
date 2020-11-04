<template>
  <div>
    <!-- 信息{{ customerInfo }} -->

    <div class="block">
      <el-avatar :size="100" :src="customerInfo.imgPhoto"></el-avatar>
      <div class="fontS">{{ customerInfo.realname }}</div>
      <div>海纳百川，有容则大</div>
    </div>
    <div class="down">
      <div>联系方式：{{ customerInfo.telephone }}</div>
      <div>状态：{{ customerInfo.status }}</div>
      <div>地址：{{ customerInfo.province }}{{ customerInfo.city }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      customerId: this.$route.params.id,
    };
  },
  computed: {
    ...mapState("customer", ["customerInfo"]),
  },
  methods: {
    ...mapActions("customer", ["findCustomerById"]),
  },
  created() {
    console.log(this.$route.params.id);
    this.findCustomerById({ id: this.customerId });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.block {
  & > * {
    margin: 13px 0 10px 100px;
  }
}
.fontS {
  font-size: 20px;
  font-weight: 800;
}
.down {
  margin-top: 25px;
  & > * {
    margin: 8px 0;
  }
}
</style>