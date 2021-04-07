<template>
  <div class="UserHome">
    <el-row :gutter="15">
      <!-- 文件夹目录 -->
      <el-col :span="5">
        <div class="UserHome-left__wrapper">
          <div
            class="HpNavItem-title"
            v-on:click.right.prevent="showMenu($event)"
          >
            个人目录区
          </div>
          <hp-nav-item
            :data="directorData"
            @success="getDirectory"
          ></hp-nav-item>
        </div>
      </el-col>
      <!-- 显示所有文章 -->
      <el-col :span="14">
        <div class="UserHome-middle__wrapper">
          <!-- 表格内容 -->
          <el-table
            :data="tableData"
            ref="multipleTable"
            @select-all="seletAllArticle"
            @select="handleSelect"
            style="width: 100%"
          >
            <!-- 序号 -->
            <el-table-column type="selection" width="55"> </el-table-column>
            <!-- 文章主体内容 -->
            <el-table-column label="文章">
              <template slot-scope="scope">
                <article-introduce :article="scope.row"></article-introduce>
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
                   @click="$router.push({path:`ReadArticle/${scope.row.id}`})"
                  icon="el-icon-view"
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
          <!-- 多选控制 -->
          <div
            style="margin-top: 20px;display:flex; flex-direction: row;justify-content: flex-end;"
          >
            <el-button @click="cancelSelect()">取消选择</el-button>
            <el-button
              @click="deleteAllSelecteds(allSelectedArticleIds)"
              type="danger"
              icon="el-icon-document-delete"
              >删除所选</el-button
            >
          </div>
        </div>
      </el-col>
      <!-- 计划表 -->
      <el-col :span="5">
        <calender-plan></calender-plan>
      </el-col>
    </el-row>
    <!-- 动态创建子目录 -->
    <menu-item :visible.sync="visible" :event="event">
      <a @click="addHandle(null)">创建子目录</a>
    </menu-item>
  </div>
</template>
<script>
import HpNavItem from "@/components/other/HpNavItem.vue";
import ArticleIntroduce from "@/components/other/ArticleIntroduce.vue";
import CalenderPlan from "@/components/other/CalenderPlan.vue";
import MenuItem from "@/components/other/MenuItem.vue";
import { throttle } from "@/utils/throttle.js";
import { httpCreateDirector, httpGetDirectory } from "@/network/Directory.js";
import {
  httpArticleQuery,
  httpArticleQueryByUIdAndContent,
  httpDeleteArticles,
} from "@/network/Article.js";

export default {
  name: "user-home",
  components: {
    "hp-nav-item": HpNavItem,
    "article-introduce": ArticleIntroduce,
    "calender-plan": CalenderPlan,
    MenuItem,
  },
  model: {},
  props: {},
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      allSelectedArticleIds: new Set(), // 避免id重复
      directorData: [],
      event: new PointerEvent(""),
      visible: false,
      start: 0, // 请求数据的起始值
      sum: 5, // 请求数据的量
    };
  },
  computed: {},
  watch: {},
  // 进入此组件,组件还没渲染
  beforeRouteEnter(to, from, next) {
    next();
  },
  // 离开此组件
  beforeRouteLeave(to, from, next) {
      throttle.removeScrool();
      this.start = 0;
      this.tableData = [];
      next();
  },
  created() {},
  mounted() {
    this.addTableData();
    this.getDirectory();
    this.getArticle();
  },
  updated(){
  },
  beforeDestroy() {
    throttle.removeScrool();
  },
  destroyed() {},
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
     * 删除所选择的文章。
     */
    deleteAllSelecteds(set) {
      let _this = this;
      this.$confirm("此操作将永久删除所选文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 这里进行删除操作。
          httpDeleteArticles(Array.from(_this.allSelectedArticleIds)).then(
            (data) => {
              _this.$message({
                type: "success",
                message: "删除成功!",
              });

              _this.getDirectory();
              _this.getArticle();
            }
          );
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
      let _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          httpDeleteArticles([article.id]).then((data) => {
            _this.$message({
              type: "success",
              message: "删除成功!",
            });
            _this.getDirectory();
            _this.getArticle();
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
     * 懒加载数据
     */
    addTableData() {
      let _this = this;
      throttle.scroolRun(100, () => {
        return new Promise((resolve, reject) => {
          let uId = _this.$store.state.people.user.id;
          httpArticleQueryByUIdAndContent(uId, "", _this.start, _this.sum)
            .then((response) => {
              response.data.forEach((element) => {
                _this.tableData.push(element);
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
    /**
     * 添加数据
     */
    addHandle(event) {
      this.$prompt("请输入目录名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(\w|\W)+$/,
        inputErrorMessage: "请输入目录名称",
      })
        .then(({ value }) => {
          let pid = this.$store.state.people.user.id;
          let path = "/" + pid;
          let name = value;
          let articleId = 0;
          let uid = this.$store.state.people.user.id;
          httpCreateDirector(pid, path, value, 0, uid).then(() => {
            this.getDirectory();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    /**
     * 右击弹出菜单
     */
    showMenu(event) {
      this.event = event;
      this.visible = true;
    },
    /**
     * 获取目录
     */
    getDirectory() {
      httpGetDirectory(this.$store.state.people.user.id)
        .then((response) => {
          this.directorData = Array.isArray(response.data) ? response.data : [];
        })
        .catch((err) => {
          this.directorData = [];
        });
    },
    /**
     * 获取文章
     */
    getArticle() {
      let uId = this.$store.state.people.user.id;
      httpArticleQueryByUIdAndContent(uId, "", this.start, this.sum)
        .then((response) => {
          this.tableData =  Array.isArray(response.data) ? response.data : [];
          this.start += this.sum;
        })
        .catch((err) => {
          this.tableData = [];
        });
    },
  },
};
</script>

<style lang="less" scoped>
.UserHome {
  margin-top: 10px;
  overflow: hidden;
  .UserHome-left__wrapper {
    background-color: #ffffff;
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .UserHome-middle__wrapper {
    background-color: #ffffff;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
}
</style>
