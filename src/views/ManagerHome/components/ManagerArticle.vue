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
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table
        :data="articles"
        ref="multipleTable"
        @select-all="seletAllArticle"
        @select="handleSelect"
        style="width: 100%"
      >
        <!-- 序号 -->
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- 用户主体内容 -->
        <el-table-column label="文章名">
          <template slot-scope="scope">
            {{ scope.row.articleName }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              v-if="scope.row.canCross === 1"
              type="success"
              size="mini"
              icon="el-icon-edit-outline"
            ></el-button>
            <el-button
              v-else-if="scope.row.canCross === 0"
              type="info"
              size="mini"
              icon="el-icon-edit-outline"
            ></el-button>
            <el-button
              v-else
              size="mini"
              icon="el-icon-edit-outline"
            ></el-button>
            <!-- 查看 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="$router.push('/Home/ReadArticle/' + scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-document-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 分页操作 -->
    <div class="pageHandle">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="pageSum"
        :current-page.sync="pageNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { throttle } from "@/utils/throttle.js";
import {
  httpArticleQuery,
  httpArticleQueryByUIdAndContent,
  httpDeleteArticles,
  httpArticleQuerySum,
} from "@/network/Article.js";
export default {
  name: "manager-user",
  components: {},
  model: {},
  props: {},
  data() {
    return {
      articles: [],
      multipleSelection: [],
      allSelectedArticleIds: new Set(), // 避免id重复
      pageNum: 1,
      pageSize: 10, // 每一页请求数
      pageSum: 0,
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.getData(this.pageNum - 1, this.pageSize);
    },
    pageNum(newValue, oldVaue) {
      this.getData(this.pageNum - 1, this.pageSize);
    },
  },
  created() {},
  async mounted() {
    this.getData(0, this.pageSize);
    this.pageSum = await httpArticleQuerySum("");
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
    handleEdit(index, article) {
      this.$router.push("/EditArticle/" + article.id);
    },
    /**
     * 删除对应文章
     */
    handleDelete(index, article) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
     * 获取数据
     */
    async getData(pageNum = 0, pageSize = 5) {
      let content = this.$route.query.content ? this.$route.query.content : "";
      let uId = this.$route.query.uId;
      (await uId)
        ? httpArticleQueryByUIdAndContent(uId, content, pageNum, pageSize)
            .then((response) => {
              this.articles = response.data;
            })
            .catch((err) => {
              this.articles = [];
              this.pageNum = 1;
            })
        : httpArticleQuery(content, pageNum, pageSize)
            .then((response) => {
              this.articles = response.data;
            })
            .catch((err) => {
              this.articles = [];
              this.pageNum = 1;
            });
    },
  },
};
</script>

<style lang="less" scoped>
.ManagerUser {
  position: relative;
  padding-bottom: 2vh;
  display: flex;
  flex-direction: column;
  .nav-wrapper {
    padding: 15px;
    font-size: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .pageHandle {
    bottom: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
