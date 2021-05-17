<template>
  <div class="ManagerUser">
    <el-col :span="24">
      <el-breadcrumb separator="/" class="nav-wrapper">
        <el-breadcrumb-item :to="{ path: '/ManagerHome' }"
          >首页</el-breadcrumb-item
        >
        <el-breadcrumb-item
          ><router-link to="/ManagerHome/User"
            >数据管理</router-link
          ></el-breadcrumb-item
        >
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="users" ref="multipleTable" style="width: 100%">
        <!-- 序号 -->
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <!-- 用户主体内容 -->
        <el-table-column label="用户名">
          <template slot-scope="scope">
            {{ scope.row.userName }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit-outline"
            ></el-button>
            <!-- 查看 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="handleShow(scope.$index, scope.row)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              icon="el-icon-document-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </div>
</template>

<script>
import { throttle } from "@/utils/throttle.js";
import { httpUserQueryMore, httpUserDelete } from "@/network/User.js";
export default {
  name: "manager-user",
  components: {},
  model: {},
  props: {},
  data() {
    return {
      users: [],
      multipleSelection: [],
      allSelectedArticleIds: new Set(), // 避免id重复
      start: 0, // 请求数据的起始值
      sum: 20, // 请求数据的量
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      throttle.removeScrool();
      this.start = 0;
      this.articles = [];
      this.getData(this.start, this.sum);
      this.addData();
    },
  },
  created() {},
  mounted() {
    this.start = 0;
    this.getData(this.start, this.sum);
    this.addData();
  },
  // 离开此组件
  beforeRouteLeave(to, from, next) {
    throttle.removeScrool();
    this.start = 0;
    this.articles = [];
    next();
  },
  beforeDestory() {},
  methods: {
    /**
     * 取消选择
     */
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
      this.allSelectedArticleIds.clear();
    },
    /**
     * 判断是否删除或者添加文章id
     */
    handleSelect(selection, row) {
      // 如果存在id则说明是取消操作
      if (this.allSelectedArticleIds.has(row.id)) {
        this.allSelectedArticleIds.delete(row.id);

        // 如果不存在id则说明是添加操作
      } else {
        this.allSelectedArticleIds.add(row.id);
      }
    },
    /**
     * set: 保存所有文章id
     * 根据set里面的id删除所有文章。
     */
    deleteAllSelecteds(set) {
      this.$confirm("此操作将永久删除所选文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 这里进行删除操作。
          console.log(set);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * selection 表格数据
     * 将selection里面文章的id存储进this.allSelectedArticleIds
     */
    seletAllArticle(selection) {
      // 不为0 则选择了全部
      if (selection.length != 0) {
        selection.forEach((v) => {
          this.allSelectedArticleIds.add(v.id);
        });
        console.log(this.allSelectedArticleIds);
        // 为0 则取消了所有选择
      } else {
        this.allSelectedArticleIds.clear();
      }
    },
    /**
     * index 表格行下标
     * article 表格的行数据
     * 根据进入编辑文章页
     */
    handleEdit(index, user) {
      this.$router.push("/ManagerHome/EditUser/" + user.id);
    },
    /**
     * index 表格行下标
     * article 表格的行数据
     * 根据进入编辑文章页
     */
    handleShow(index, user) {
      this.$router.push("/ManagerHome/ShowUser/" + user.id);
    },
    /**
     * 删除对应文章
     */
    handleDelete(user) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpUserDelete([user.id])
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getData(this.start, this.sum);
            })
            .catch((err) => {
              this.$message({
                type: "error",
                message: err,
              });
              this.getData(this.start, this.sum);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /**
     * 获取数据
     */
    getData(start = 0, end = 5) {
      httpUserQueryMore(start, end)
        .then((response) => {
          this.users = response.data;
          this.start += this.sum;
        })
        .catch((err) => {
          this.users = [];
          this.start = 0;
        });
    },
    /**
     * 滚动向下懒加载数据
     */
    addData() {
      let _this = this;
      throttle.scroolRun(100, () => {
        return new Promise((resolve, reject) => {
          httpUserQueryMore(_this.start, _this.sum)
            .then((response) => {
              response.data.forEach((element) => {
                _this.users.push(element);
              });
              _this.start += _this.sum;
              resolve();
            })
            .catch((err) => {
              reject();
            });
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ManagerUser {
  .nav-wrapper {
    padding: 15px;
    font-size: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
