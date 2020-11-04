<template>
  <div class="button">
    <el-button type="text" @click="toBack">返回</el-button>

    <!-- 展示产品信息 -->
    <div>产品名称:{{ productId.name }}</div>
    <div>产品价格:{{ productId.id }}</div>
    <div>产品描述:{{ productId.description }}</div>
    <div>产品主图:</div>
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
    ...mapState("product", ["productId"]),
  },
  methods: {
    ...mapActions("product", ["productFindById"]),
    // 返回产品管理页面
    toBack() {
      this.$router.go(-1);
    },
  },
  created() {
    // 动态路由传参的参数在this.$route
    console.log(this.$route.params.id);
    this.productFindById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.button {
  & > * {
    margin: 15px 5px;
  }
}
</style>