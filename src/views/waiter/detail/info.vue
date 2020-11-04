<template>
  <div>
    <!-- 信息{{ waiterInfo }} -->

    <div class="block">
      <el-avatar :size="100" :src="waiterInfo.imgPhoto"></el-avatar>
      <div class="fontS">{{ waiterInfo.realname }}</div>
      <div>海纳百川，有容则大</div>
    </div>
    <div class="down">
      <div>联系方式：{{ waiterInfo.telephone }}</div>
      <div>状态：{{ waiterInfo.status }}</div>
      <div>地址：{{ waiterInfo.province }}{{ waiterInfo.city }}</div>
    </div>
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
    ...mapState("waiter", ["waiterInfo"]),
  },
  methods: {
    ...mapActions("waiter", ["findWaiterById"]),
  },
  created() {
    console.log(this.$route.params.id);
    this.findWaiterById({ id: this.waiterId });
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