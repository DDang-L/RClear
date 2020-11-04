<template>
  <div>
    <!-- 按钮 -->
    <div class="options">
      <el-button type="primary" size="mini" @click="toAdd">添加</el-button>
      <el-input
        v-model="queryParams.name"
        placeholder="请输入产品名称"
        size="mini"
      ></el-input>
      <el-button type="primary" size="mini" @click="toSearch">查询</el-button>
      <el-button
        type="danger"
        size="mini"
        @click="toBatchDatele"
        :disabled="isDisabled"
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <!-- {{ ids }} -->
    <div class="tables">
      <!--  @selection-change="handleSelectionChange" 当复选框发生变化的时候，触发的时间处理程序 -->
      <el-table
        :data="productData"
        stripe
        style="width: 100%"
        height="calc(100vh - 180px)"
        @selection-change="handleSelectionChange"
      >
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>

        <el-table-column
          type="index"
          :index="indexMethod"
          label="编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="产品名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100" align="center">
        </el-table-column>
        <el-table-column prop="description" label="产品描述"> </el-table-column>
        <el-table-column
          prop="categoryId"
          label="所属产品"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
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
    <!-- title 标题 -->
    <!--  dialogFormVisible 模态框显示-->
    <!--  @close="dialogClose" 对模态框的监听，模态框关闭的时候，对表单进行重置 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="dialogClose"
    >
      <!-- {{ form }} -->
      <!--:model="form" form变量注意在数据模型中提供空对象为表单数据  -->
      <!-- ref="ruleForm" 为了获取表单数据 -->
      <!-- :rules="rules" 验证规则  在表单上面可写prop属性-->
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-form-item
          label="产品名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 下拉列表选择所属产品 -->
        <el-form-item
          label="所属栏目"
          :label-width="formLabelWidth"
          prop="categroyId"
        >
          <el-select v-model="form.categroyId" placeholder="请选择所属栏目">
            <el-option
              v-for="(item, index) in categoryData"
              :key="index"
              :label="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 介绍 -->
        <el-form-item
          label="介绍"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="请输入产品介绍"
          ></el-input>
        </el-form-item>

        <!-- 上传 -->
        <!-- action 上传到的图片接口-->
        <el-upload
          class="avatar-uploader"
          action="/image/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入vuex或者axios
import { mapActions, mapGetters, mapState } from "vuex";
import { deleteById, batchDelete } from "@/api/product.js";

export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        name: "",
      },

      // 2.数据模型中提供imageUrl变量
      // 图片上传到action指定的接口之后，返回的的图片地址
      imageUrl: "",

      // 批量删除按钮的禁用
      isDisabled: true,

      // 模态框标题
      title: "添加产品信息",

      // 模态框显示
      dialogFormVisible: false,

      // label宽度
      formLabelWidth: "120px",

      // 表单数据
      form: {},

      // 批量删除的id数组
      ids: [],

      // 校验规则
      rules: {
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        categroyId: [
          { required: true, message: "请选择所属产品", trigger: "change" },
        ],
      },

      // 文件
      fileList: [],
    };
  },
  computed: {
    ...mapGetters("product", ["total", "productData"]),
    // 栏目信息
    ...mapState("categroy", ["categoryData"]),
  },
  methods: {
    ...mapActions("product", ["productFindAll", "saveOrUpdate"]),
    ...mapActions("categroy", ["categoryFindAll"]),

    // 删除
    toDelete(row) {
      console.log(row);
      // 点击删除的弹框
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求，提示删除成功
          deleteById({ id: row.id })
            .then((res) => {
              if (res.status === 200) {
                // 提示用户删除成功，然后刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                this.productFindAll(this.queryParams);
              } else {
                // 删除失败
                this.$notify({
                  title: "失败",
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              // 删除失败
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

    // 批量删除
    toBatchDatele() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 发送请求，提示删除成功
          // this.ids是数组[],后台的ids的数据格式是 1,2,3-->用join(',')
          batchDelete({ ids: this.ids.join() })
            .then((res) => {
              if (res.status === 200) {
                // 提示用户删除成功，然后刷新数据
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success",
                });
                this.productFindAll(this.queryParams);
              } else {
                // 删除失败
                this.$notify({
                  title: "失败",
                  message: "删除失败",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              // 删除失败
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
      // console.log(row);

      // 数据上到表单，模态框显示，修改后确定保存
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.title = "修改产品信息";
    },
    // 详情
    toDetail(row) {
      // console.log(row);

      // 跳转到详情页面
      this.$router.push(`/productDetail/${row.id}/detail`);
    },

    // 条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);

      // 当每页条数发生改变，page需要从第一页开始查找，然后在发送请求。
      this.queryParams.pageSize = val;
      //  page = 1 修改了模型中的数据，传给仓库中的commit的payload参数。productFindAll()函数最终是在api中的文件
      this.queryParams.page = 1;
      // 发送请求
      this.productFindAll(this.queryParams);
    },

    // 页码
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);

      // 当点击页码发生改变的时候，改变数据模型中的page,再发起请求
      this.queryParams.page = val;
      this.productFindAll(this.queryParams);
    },

    // 查询产品名称
    toSearch() {
      // 发送请求前，设置page的从第一页开始查询
      this.queryParams.page = 1;
      this.productFindAll(this.queryParams);
    },

    //自定义索引(编号)
    indexMethod(index) {
      // (页码-1) * 条数+索引+1
      let { page, pageSize } = this.queryParams;
      return (page - 1) * pageSize + index + 1;
    },

    // 添加按钮
    toAdd() {
      this.title = "添加产品信息";
      // 清空表单
      this.form = {};
      this.dialogFormVisible = true;
    },

    // dialog 关闭的回调
    dialogClose() {
      this.$refs["ruleForm"].resetFields();
    },

    // 确定按钮
    toSave() {
      // 校验数据，数据通过之后，再保存
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // 数据校验成功之后，调一下仓库发送请求保存数据
          this.saveOrUpdate({
            form: this.form,
            queryParams: this.queryParams,
          }).then(() => {
            this.dialogFormVisible = false;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 复选框点击的事件处理程序
    handleSelectionChange(val) {
      // val数组是一个数组，数组存的是每一个复选选中的对象。需要数组内的每一个对象的id
      // console.log(val, "----");
      this.ids = val.map((item) => item.id);
      if (this.ids.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },

    // 3.提供图片上传成功的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.url;
      //res.url 值为这样的字符串"/image/upload_28d884f3c3cb2c0532cbfbbb0dc5b613.jpeg"，如果之后要访问该图片，使用【服务器+路径】的形式访问。例如"http://47.102.96.246:5123/image/upload_28d884f3c3cb2c0532cbfbbb0dc5b613.jpeg"
    },
  },
  created() {
    this.productFindAll(this.queryParams);
    this.categoryFindAll();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
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


<style >
/* 4.组件中提供样式，注意在style less同级别提供一个css的style标签写内容 */

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>