<template>
  <div>
    <!-- 表格 -->
    <div>
      <el-table :data="commentDotal" stripe style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="content" label="评论内容" width="180">
        </el-table-column>
        <el-table-column prop="commentTime" label="评论时间"> </el-table-column>
        <el-table-column prop="orderId" label="产品ID"> </el-table-column>
        <el-table-column prop="status" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="mini"
              >删除</el-button
            >
            <el-button @click="toCheck(scope.row)" type="text" size="mini">{{
              scope.row.status == "审核不通过" ? "通过审核" : "拒绝审核"
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div>
      <!-- @size-change="handleSizeChange"改变每页条数 -->
      <!-- @current-change="handleCurrentChange" 改变页码 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryParams.page"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 评论
    {{ total }}
    ===
    {{ commentDotal }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  commentDeleteById,
  commentRefuseExamine,
  commentExamine,
} from "@/api/comment.js";

export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 5,
      },

      submit: "拒绝审核",
    };
  },
  computed: {
    ...mapGetters("comment", ["total", "commentDotal"]),
  },

  methods: {
    ...mapActions("comment", ["commentFindAll"]),

    // 每页条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.queryParams.page = val;
      this.queryParams.page = 1;
      this.commentFindAll(this.queryParams);
    },

    // 当前页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.commentFindAll(this.queryParams);
    },

    // toDelete 删除
    toDelete(row) {
      console.log(row);

      // 询问用户是否进行删除操作
      //  $confirm的then()、catch（）
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          commentDeleteById({ id: row.id })
            .then((res) => {
              if (res.status === 200) {
                // 提示用户删除成功，刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                /*  // 删除后从第一个开始重查找数据
                this.queryParams.page = 1; */
                this.commentFindAll(this.queryParams);
              } else {
                this.$notify({
                  title: "失败",
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //  拒绝审核
    toCheck(row) {
      console.log(row);
      if (row.status == "审核不通过") {
        // 通过审核请求
        commentExamine({ commentid: row.id }).then((res) => {});
      } else {
        // 拒绝审核请求
        commentRefuseExamine({ commentid: row.id }).then((res) => {});
      }
      this.commentFindAll(this.queryParams);
    },
  },

  created() {
    this.commentFindAll(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>