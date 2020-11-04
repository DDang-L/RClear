<template>
  <div>
    <!-- 员工审核 -->
    <!-- {{ total }}=={{ waiterData }} -->
    <!-- 表格 -->
    <div>
      <el-table
        :data="waiterData"
        stripe
        style="width: 100%"
        height="calc(100vh - 180px)"
      >
        <el-table-column prop="id" label="编号" width="100"> </el-table-column>
        <el-table-column prop="realname" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="telephone" label="手机号"> </el-table-column>
        <el-table-column prop="idCard" label="身份证" width="180">
        </el-table-column>
        <el-table-column prop="bankCard" label="银行卡号"> </el-table-column>
        <el-table-column prop="registerTime" label="注册时间">
        </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button @click="toCheck(scope.row)" type="text" size="small"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[5, 8, 10]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <!-- 模态框 -->
    <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
    <!-- 数据模型中的变量title 标题 -->
    <!-- :visible.sync="dialogTableVisible" 控制模态框的显示 true显示 -->
    <el-dialog :title="title" :visible.sync="visible" class="dilog">
      <div class="dilogDiv">
        <div>用户名：{{ realname }}</div>
        <div>身份证号：{{ idCard }}</div>
        <div>
          身份证正面照:
          <div class="up"></div>
        </div>
        <div>
          身份证反面照:
          <div class="up"></div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini">审核通过</el-button>

        <el-button type="danger" @click="toReCheck" size="mini"
          >拒绝审核</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },

      // 模态框的显示与隐藏
      visible: false,

      // 模态框标题
      title: "审核员工",

      realname: "",
      idCard: "",
    };
  },
  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },
  methods: {
    ...mapActions("waiter", ["waiterFindAll"]),

    // 每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      this.waiterFindAll(this.queryParams);
    },
    // 页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.waiterFindAll(this.queryParams);
    },

    // 员工审核
    toCheck(row) {
      console.log(row);
      this.realname = row.realname;
      this.idCard = row.idCard;
      this.visible = true;
    },

    // 拒绝审核
    toReCheck(row) {
      this.visible = false;
    },
  },
  created() {
    this.waiterFindAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.dilog .dilogDiv {
  & > * {
    float: left;
    margin: 10px 150px 10px 10px;
  }
}
.dilog .dilogDiv .up {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  margin-top: 10px;
}
</style>