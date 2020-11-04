<template>
  <div>
    <!-- 按钮 -->
    <div class="optio">
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>
      <!--  v-model="queryParams.name" 双向数据绑定 -->
      <el-input
        class="options"
        v-model="queryParams.name"
        placeholder="请输入栏目名称"
        size="mini"
      ></el-input>
      <el-button type="primary" @click="toSearch" size="mini">查询</el-button>
      <el-button
        type="danger"
        @click="toBatchDatele"
        size="mini"
        :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>

    <!-- {{ ids }} -->
    <!-- 表格 -->
    <div>
      <el-table
        :data="categroyData"
        stripe
        style="width: 100%"
        size="mini"
        height="calc(100vh - 180px)"
        @selection-change="handleSelectionChange"
      >
        <!-- 复选框 -->
        <el-table-column type="selection" width="40" align="center">
        </el-table-column>
        <el-table-column
          type="index"
          width="180"
          label="编号"
          :index="indexMethod"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="栏目名称" width="180">
        </el-table-column>
        <el-table-column prop="num" label="序号" align="center">
        </el-table-column>
        <el-table-column prop="parentId" label="父栏目" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <!-- scope.row一行的对象 -->
          <template slot-scope="scope">
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
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
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <!-- 数据模型中的变量title 标题 -->
    <!-- :visible.sync="dialogTableVisible" 控制模态框的显示 true显示 -->
    <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <!--展示form 传给后台的数据 -->
      <!-- {{ form }} -->

      <!-- ref="ruleForm"获取表单数据 -->
      <!-- :rules="rules" 数据模型中的验证规则 -->
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <!-- prop="name" 与下方的rule name -->
        <el-form-item
          prop="name"
          label="栏目名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="num" label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 下拉列表选择所属产品 -->
        <el-form-item
          label="所属栏目"
          :label-width="formLabelWidth"
          prop="parentId"
        >
          <el-select v-model="form.parentId" placeholder="请选择所属栏目">
            <el-option
              v-for="(item, index) in categroyData"
              :key="index"
              :label="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { categoryDeleteById, categoryBatchDelete } from "@/api/categroy.js";

export default {
  data() {
    return {
      // 获取数据的参数
      queryParams: {
        page: 1,
        pageSize: 10,
        name: "",
      },
      // 模态框标题
      title: "添加栏目信息",

      // 模态框显示
      visible: false,

      // 表单数据
      form: {},

      // label的宽度
      formLabelWidth: "120px",

      ids: [],

      // 校验规则
      rules: {
        name: [
          { required: true, message: "请输入栏目名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2到 5 个字符", trigger: "blur" },
        ],
        num: [
          { required: true, message: "请输入序号", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
      },

      // 批量删除按钮的禁用：刚刚开始是禁用
      isDisabled: true,
    };
  },

  computed: {
    ...mapGetters("categroy", ["total", "categroyData"]),
  },

  methods: {
    ...mapActions("categroy", ["categroyQueryFindAll", "categorySaveOrUpdate"]),

    // 单个删除
    toDelete(row) {
      // 询问用户是否进行删除操作
      //  $confirm的then()、catch（）
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          categoryDeleteById({ id: row.id })
            .then((res) => {
              if (res.status === 200) {
                // 提示用户删除成功，刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                /*  // 删除后从第一页开始重查找数据
                this.queryParams.page = 1; */
                this.categroyQueryFindAll(this.queryParams);
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
                message: "删除失败2",
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

    // 批量删除
    toBatchDatele() {
      //  $confirm的then()、catch（）
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          // this.ids是数组[]后台的数据格式是 1,2,3-->用join(',')
          categoryBatchDelete({ ids: this.ids.join() })
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
                this.categroyQueryFindAll(this.queryParams);
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

    // 编辑
    toEdit(row) {
      console.log(row);
      this.form = { ...row };
      this.visible = true;
      this.title = "修改顾客信息";
    },

    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryParams.pageSize = val;
      this.categroyQueryFindAll(this.queryParams);
    },
    // 页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryParams.page = val;
      this.categroyQueryFindAll(this.queryParams);
    },

    // 查询按钮
    toSearch() {
      this.queryParams.page = 1;
      this.categroyQueryFindAll(this.queryParams);
    },

    // 模态框出现
    toAdd() {
      // 模态框标题
      this.title = "新增栏目";
      // 清空表单
      this.form = {};
      this.visible = true;
    },

    // 确定按钮
    toSave() {
      // 校验数据，数据通过之后，再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 调仓库的动作
          this.categorySaveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            this.visible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 对表单进行重置
    dialogClose() {
      // 重置表单
      // $refs 通过<el-form>中的ref的属性值获取表单实例，去进行重置
      // console.log(this.$refs);
      this.$refs["ruleForm"].resetFields();
    },

    // 编号
    indexMethod(index) {
      // (页码-1) *条数+索引+1
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },

    // 表格多选变化的事件处理程序
    handleSelectionChange(val) {
      console.log(val);
      // val数组是一个数组，数组存的是每一个复选选中的对象。需要数组内的每一个对象的id
      this.ids = val.map((item) => item.id);
      // 控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        isDisabled: true;
      }
    },
  },

  created() {
    this.categroyQueryFindAll(this.queryParams);
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
.optio {
  & > * {
    float: left;
    margin-right: 10px;
  }
}
.options {
  width: 200px;
}
</style>