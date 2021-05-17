<!--
功能：
显示文章内容，对文章进行创建、编辑、删除
-->
<template>
  <div class="ReadArticle">
    <el-row :gutter="20">
      <el-col :span="2" :offset="2">
        <!-- 观看 点赞 收藏 审核-->
        <div class="handle-wrapper">
          <el-button
            v-if="$store.state.people.user.authority === 1"
            @click="canCross"
            type="success"
            style="margin-bottom:20px"
            >审核</el-button
          >
          <el-badge
            :value="article.readTime"
            :max="99"
            size="medium"
            type="primary"
          >
            <el-button icon="el-icon-view" circle></el-button>
          </el-badge>
          <el-badge
            :value="articleGood"
            :max="99"
            size="medium"
            style="margin-top:20px"
            type="primary"
          >
            <el-button
              icon="el-icon-thumb"
              circle
              @click="doArticleGood"
            ></el-button>
          </el-badge>
          <!-- <el-badge
            :value="200"
            :max="99"
            size="medium"
            style="margin-top:20px"
            type="primary"
          >
            <el-button icon="el-icon-chat-dot-round" circle></el-button>
          </el-badge> -->
        </div>
      </el-col>
      <el-col :span="14" :offset="4">
        <!-- 文章头部信息 -->
        <article-header :article="article"></article-header>
        <!-- 文章内容 -->
        <article-body :article="article"></article-body>
        <!-- 评论 -->
        <div class="comment-wrapper">
          <ReplyCom @success="commentSubmit"></ReplyCom>
          <show-com
            v-for="(comment, index) of comments"
            :key="index"
            :comment="comment"
            @success="getComments()"
          ></show-com>
        </div>
      </el-col>
      <el-col :span="6">
        <!-- 文章目录 -->
        <article-title-list></article-title-list>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// 组件
import ArticleHeader from "@/views/ReadArticle/components/ArticleHeader.vue";
import ArticleBody from "@/views/ReadArticle/components/ArticleBody1.vue";
import ArticleTitleList from "@/views/ReadArticle/components/ArticleTitleList.vue";
import ShowCom from "@/views/ReadArticle/components/ShowCom.vue";
import ReplyCom from "@/views/ReadArticle/components/ReplyCom.vue";

import { MessageBox } from "element-ui";

// 请求
import {
  httpArticleQueryOne,
  htttpUpdateArticleGood,
  htttpUpdateArticleCanCross,
} from "@/network/Article.js";
import { httpCommentAdd, httpCommentQuery } from "@/network/Comment.js";

// 全局方法
import { ParseArticleContentToHs } from "@/utils/ArticleParse.js";

export default {
  name: "ReadArticle",
  components: {
    "article-header": ArticleHeader,
    "article-body": ArticleBody,
    "article-title-list": ArticleTitleList,
    "show-com": ShowCom,
    ReplyCom,
  },
  props: {},
  data() {
    return {
      titles: [],
      // 模拟评论数据
      comments: [],
      article: {},
      articleHtml: "",
      articleGood: 0,
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {
    this.readArticle();
    this.titles = ParseArticleContentToHs(
      document.getElementById("_articleHTML")
    );
    this.getComments(this.$route.params.Id);
  },
  updated() {},
  beforeDestroy() {},
  methods: {
    /**
     * 提交评论
     */
    commentSubmit(event) {
      let content = event.data.content;
      if (content === "") {
        this.$message({
          message: "请您输入内容",
          type: "error",
        });
        return;
      }

      let aId = this.article.id;
      let uId = this.$store.state.people.user.id;
      let userName = this.$store.state.people.user.userName;
      let path = "/" + aId;
      let pId = aId;

      httpCommentAdd(aId, uId, userName, content, path, pId)
        .then((respone) => {
          this.$message({
            message: "评论成功",
            type: "success",
          });
          this.getComments(this.$route.params.Id);
        })
        .catch((err) => {});
    },
    /**
     * 根据文章id获取文章内容
     */
    async readArticle() {
      await httpArticleQueryOne(this.$route.params.Id).then((Response) => {
        this.article = Response.data;

        Response.data.good ? this.articleGood = Response.data.good.split(",").length - 1 : '';
      });
    },
    /**
     * 根据文章ID删除文章
     */
    async deleteArticle1(articleId) {
      await deleteArticle("/Article/delete", articleId).then((Response) => {
        this.$router.push("/");
      });
    },
    async getComments(articleId = this.$route.params.Id) {
      httpCommentQuery(articleId)
        .then((Response) => {
          this.comments = Response.data;
        })
        .catch((err) => {});
    },
    /**
     * 点赞文章
     */
    doArticleGood() {
      let articleId = this.$route.params.Id;
      htttpUpdateArticleGood(articleId)
        .then((respone) => {
          this.articleGood++;
        })
        .catch((err) => {
          this.$message({
            message: "点赞失败",
            type: "error",
          });
        });
    },
    /**
     * 审核文章
     */
    canCross() {
      this.$confirm("笔记是否审核通过?", "提示", {
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning",
      })
        .then(() => {
          htttpUpdateArticleCanCross([this.$route.params.Id],1).then(() => {
            this.$message({
              type: "success",
              message: "审核通过!",
            });
          });
        })
        .catch(() => {
          htttpUpdateArticleCanCross([this.$route.params.Id],0).then(() => {
            this.$message({
              type: "info",
              message: "审核不通过",
            });
          });
        });
    },
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("getArticle", {
        url: "/Article/find",
        parmas: { id: this.$route.params.Id },
      });
    },
    "$store.state.article.article": function() {
      this.$nextTick(() => {
        let article = this.$store.getters.getArticle;
        this.titles = this.ParseArticleContentToHs(this.$el);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ReadArticle {
  margin-top: 26px;
  overflow-x: hidden;
  .comment-wrapper {
    background-color: #ffffff;
    padding: 10px 30px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .handle-wrapper {
    position: fixed;
    top: 20%;
    display: flex;
    flex-direction: column;
  }
}
</style>
