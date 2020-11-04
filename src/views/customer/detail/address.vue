<template>
  <div>
    <!-- 地址{{ addressData }} -->

    <!-- 表格 -->
    <div>
      <el-table
        :data="tempData"
        stripe
        style="width: 100%"
        height="calc(100vh - 350px)"
      >
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="province" label="省" width="180">
        </el-table-column>
        <el-table-column prop="city" label="市"> </el-table-column>
        <el-table-column prop="area" label="区/县"> </el-table-column>
        <el-table-column prop="address" label="街道"> </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
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
        :page-sizes="[1, 2, 3]"
        :page-size.sync="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="addressData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      id: this.$route.params.id,

      // 分页器页码从1开始
      page: 1,
      pageSize: 2,
    };
  },
  computed: {
    ...mapState("customer", ["addressData"]),
    // 计算属性
    tempData() {
      return this.addressData.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    },
  },

  methods: {
    ...mapActions("customer", ["findAddressById"]),
  },
  created() {
    // console.log(this.$route.params.id, "--+++++++--");

    // { id: this.id } 与api的get传参的第二个参数是配置对象，需要{id:}
    this.findAddressById({ id: this.id });
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>