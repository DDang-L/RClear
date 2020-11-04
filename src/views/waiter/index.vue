<template>
  <div>
    <!-- 添加按钮 -->
    <div>
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>
    </div>

    <!-- 表格 -->
    <div>
      <el-table
        :data="waiterData"
        stripe
        style="width: 100%"
        height="calc(100vh - 280px)"
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
            <el-button @click="toDelete(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button @click="toEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="toDetail(scope.row)" type="text" size="small"
              >详情</el-button
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
        :page-sizes="[5, 8]"
        :page-size="queryParams.pageSize"
        layout="total,sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 模态框 -->
    <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
    <!-- 数据模型中的变量title 标题 -->
    <!-- :visible.sync="dialogTableVisible" 控制模态框的显示 true显示 -->
    <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
      <!--展示form 传给后台的数据 -->
      <!-- {{ form }} -->

      <!-- ref="ruleForm"获取表单数据 -->
      <!-- :rules="rules" 数据模型中的验证规则 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" size="small">
        <!-- prop="username" 与下方的rule susername对应 -->
        <el-form-item
          prop="username"
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="realname"
          label="姓名"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="telephone"
          label="手机号"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          prop="idCard"
          label="身份证号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.idCard"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="bankCard"
          label="银行卡号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.bankCard"
            show-password
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            show-password
            autocomplete="off"
          ></el-input>
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
import { mapActions, mapGetters } from "vuex";
import { waiterDeleteById } from "@/api/waiter.js";

export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 5,
      },

      // 标题
      title: "添加员工信息",

      // 模态框的显示
      visible: false,

      // 表单数据
      form: {},

      // 输入框的大小
      formLabelWidth: "100px",

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        realname: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        telephone: [
          { required: true, message: "请输入电话号", trigger: "blur" },
          // 要注意放开
          /*  {
            min: 11,
            max: 11,
            message: "电话号码长度在11个字符",
            trigger: "blur",
          }, */
        ],
        idCard: [
          { required: true, message: "请输入电话号", trigger: "blur" },
          // 要注意放开
          /* {
            min: 13,
            max: 13,
            message: "身份证号长度在13个字符",
            trigger: "blur",
          }, */
        ],

        bankCard: [
          { required: true, message: "请输入电话号", trigger: "blur" },
          // 要注意放开
          /*  {
            min: 13,
            max: 13,
            message: "银行卡号长度在13个字符",
            trigger: "blur",
          }, */
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },

  computed: {
    ...mapGetters("waiter", ["total", "waiterData"]),
  },

  methods: {
    ...mapActions("waiter", ["waiterFindAll", "waiterSaveOrUpdate"]),

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
          waiterDeleteById({ id: row.id })
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
                this.waiterFindAll(this.queryParams);
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
      this.title = "修改员工信息";
    },

    // 详情
    toDetail(row) {
      console.log(row);
      // 跳转到详情页面
      this.$router.push(`/waiterDetai/${row.id}/detail`);
    },

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

    // 添加按钮
    toAdd() {
      this.visible = true;
    },

    // 确定保存按钮
    toSave() {
      // 校验数据，数据通过之后，再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 调仓库的动作
          this.waiterSaveOrUpdate({
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

    // dialog 关闭的回调
    dialogClose() {
      // 重置表单
      // $refs 通过<el-form>中的ref的属性值获取表单实例，去进行重置
      // console.log(this.$refs);
      this.$refs["ruleForm"].resetFields();
    },
  },

  created() {
    this.waiterFindAll(this.queryParams);
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
</style>