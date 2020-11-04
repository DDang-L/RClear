<template>
  <div>
    <div>
      <!-- 按钮 -->
      <div class="options">
        <el-button type="primary" size="mini" @click="toAdd">添加</el-button>
        <!--  v-model="queryParams.status" 双向数据绑定 -->
        <el-input
          v-model="queryParams.status"
          placeholder="请输入状态"
          size="mini"
        ></el-input>
        <!-- :disabled="isDisabled" 不选择复选框的时候按钮是禁用状态 -->
        <el-button type="primary" @click="toSearch" size="mini">查询</el-button>
        <el-button
          type="danger"
          @click="toBatchDatele"
          size="mini"
          :disabled="isDisabled"
          >批量删除</el-button
        >
        <!-- {{ids}} -->
      </div>

      <!-- 表格 -->
      <div class="tables">
        <!-- stripe斑马表格 size 表格大小-->
        <!-- :data改为数据模型中的list指向的每页顾客信息 -->
        <!-- 原生js给table设置高度table.style.height=calc() -->
        <!-- selection-change当复选框发生变化的时候触发的事件处理程序 -->
        <el-table
          :data="customerData"
          stripe
          style="width: 100%"
          size="mini"
          height="calc(100vh - 180px)"
          @selection-change="handleSelectionChange"
        >
          <!-- 复选框 -->
          <el-table-column type="selection" width="40"> </el-table-column>

          <!--type="index"  :index="indexMethod" 自定义索引 -->
          <!-- align="center" 一列剧中 -->
          <el-table-column
            type="index"
            :index="indexMethod"
            width="150"
            label="编号"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="realname" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="telephone" label="手机号"> </el-table-column>
          <el-table-column prop="status" label="状态"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <!-- scope.row一行的对象 -->
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
        <!--  分页属性值，与数据模型中的对应-->
        <!-- @size-change="handleSizeChange"改变每页条数 -->
        <!-- @current-change="handleCurrentChange" 改变页码 -->
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
      <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
      <!-- 数据模型中的变量title 标题 -->
      <!-- :visible.sync="dialogTableVisible" 控制模态框的显示 true显示 -->
      <el-dialog @close="dialogClose" :title="title" :visible.sync="visible">
        <!--展示form 传给后台的数据 -->
        <!-- {{ form }} -->

        <!-- ref="ruleForm"获取表单数据 -->
        <!-- :rules="rules" 数据模型中的验证规则 -->
        <el-form :model="form" :rules="rules" ref="ruleForm">
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

          <el-form-item
            prop="status"
            label="状态"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.status" placeholder="请选择活动状态">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="toSave">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters } from "vuex";
// 导入api
import { deleteById, batchDelete } from "@/api/customer.js"; //在下方经过deleteById 发送请求

export default {
  data() {
    return {
      // 获取数据的参数
      queryParams: {
        // 页码
        page: 1,
        // 每页条数
        pageSize: 10,
        status: "",
      },

      // 批量删除的id数组
      ids: [],

      // 模态框的显示与隐藏
      visible: false,

      // 模态框标题
      title: "新增顾客信息",

      // label宽度
      formLabelWidth: "120px",

      //表单数据
      form: {},

      // 表单验证:校验规则
      // prop
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
          {
            min: 11,
            max: 11,
            message: "电话号码长度在11个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],

        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },

      // 批量删除按钮的禁用：刚刚开始是禁用
      isDisabled: true,
    };
  },

  computed: {
    ...mapGetters("customer", ["total", "customerData"]),
  },

  methods: {
    ...mapActions("customer", ["findAll", "saveOrUpdate"]),

    // 删除
    toDelete(row) {
      // console.log(row);

      // 询问用户是否进行删除操作
      //  $confirm的then()、catch（）
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发请求删除
          deleteById({ id: row.id })
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
                this.findAll(this.queryParams);
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

    //  批量删除
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
          batchDelete({ ids: this.ids.join() })
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
                this.findAll(this.queryParams);
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

    // 编辑按钮
    toEdit(row) {
      console.log(row);

      // 数据上到表单,模态框显示，修改后确定保存
      // 给的是地址
      // this.form = row;
      this.form = { ...row };
      this.visible = true;
      this.title = "修改顾客信息";
    },

    // 跳转到详情
    toDetail(row) {
      // console.log(row);

      // 路由跳转
      // /customerDetail/:id/index
      // :id 动态参数，用模板
      this.$router.push(`/customerDetail/${row.id}/index`);
    },

    // 每页条数变化事件处理函数
    // pageSize: 10, val =10
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 改数据模型中的pageSize,设置page为1，发起请求
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      // 发起请求
      this.findAll(this.queryParams);
    },

    // 当页码发生变化的事件处理程序
    // 当页码发生变化时，若再变化每页条数，则会执行handleSizeChange()、handleCurrentChange()俩个函数
    // queryParams.page:0, val=0
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 修改数据模型中的数据并发起请求
      this.queryParams.page = val;
      // 发起请求
      this.findAll(this.queryParams);
    },

    // 自定义索引
    indexMethod(index) {
      // (页码-1) *条数+索引+1
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },

    // 表格多选变化的事件处理程序
    handleSelectionChange(val) {
      // console.log(val);
      // val数组是一个数组，数组存的是每一个复选选中的对象。需要数组内的每一个对象的id
      this.ids = val.map((item) => item.id);
      // 控制按钮禁用
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        isDisabled: true;
      }
    },

    // 查询按钮
    toSearch() {
      // 发送给后台，从第一页开始查询
      this.queryParams.page = 1;
      this.findAll(this.queryParams);
    },

    // 确定保存按钮
    toSave() {
      // 获取表单数据后校验数据，数据通过之后，再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 调仓库的动作
          this.saveOrUpdate({
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

    // 添加按钮
    toAdd() {
      // 模态框标题
      this.title = "新增顾客信息";
      // 清空表单
      this.form = {};
      // 显示模态框
      this.visible = true;
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
    // 调用findAll函数，并传参
    this.findAll(this.queryParams);
  },

  mounted() {},
};
</script>

<style lang="less" scoped>
/* 需下载cnpm i -D less-loader less */

.options {
  & > * {
    margin-right: 10px;
  }

  & div {
    width: 200px;
  }
}

.tables {
  margin: 10px 0;
}
</style>  