<template>
  <div id="createArticle">
    <div class="Article-wrapper">
      <!-- 输入标题 -->
      <el-input placeholder="请输入标题" v-model="articleName">
        <template slot="prepend">文章标题 </template>
      </el-input>
      <!-- 输入标签 -->
      <el-input
        placeholder="请输入标签，注意每个标签用英文逗号隔开"
        v-model="articleTags"
      >
        <template slot="prepend">文章标签</template>
      </el-input>
      <!-- 富文本内容 -->
      <div class="wangeEdit_wrapper">
        <mark-down v-model="articleContent" @success="getArticle"></mark-down>
      </div>
      <!-- 上传 -->
      <div class="btn_wrapper">
        <el-button-group>
          <el-button
            type="primary"
            icon="el-icon-circle-close"
            @click="cancleEdit"
            >退出</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-upload2"
            @click="commitArticle"
            >上传</el-button
          >
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>
import MarkDown from "@/components/other/MarkDown";

import {
  httpArticleAdd,
  httpArticleQueryOne,
  htttpUpdateArticle,
} from "@/network/Article.js";

export default {
  components: {
    "mark-down": MarkDown,
  },
  data() {
    return {
      articleName: "",
      articleContent: "",
      articleContentText: "",
      articleTags: "",
      articleHtml:'',
    };
  },
  created() {
    httpArticleQueryOne(this.$route.params.Id).then((Response) => {
      let article = Response.data;
      this.articleName = article.articleName;
      this.articleContent = article.articleContent;
      this.articleTags = article.tags;
    });
  },
  beforeDestroy() {},
  methods: {
    /**获取子组件的文章信息 */
    getArticle(event) {
      this.articleHtml = event.articleHtml;
    },
    /**
     * 退出
     */
    cancleEdit() {
      this.$router.go(-1);
    },
    /**
     * 上传文章
     */
    commitArticle(e) {
      htttpUpdateArticle(
        this.$route.params.Id,
        this.articleName,
        this.articleContent,
        this.articleTags,
        this.articleHtml,
      ).then((res) => {
        this.$message({
          message: "文章修改成功",
          type: "success",
        });
        this.$router.push({
          path: `/Home/ReadArticle/${this.$route.params.Id}`,
        });
      });
    },
  },
};
</script>
<style lang="less">
.editer-modle {
  background: white;
}
#createArticle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(146, 146, 146, 0.3);
  .Article-wrapper {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 10px rgb(146, 146, 144);
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    .input_wrapper {
      display: block;
      padding: 10px;
      outline: none;
      border: 0;
      border-bottom: 1px solid rgba(146, 146, 146, 0.8);
      height: 18px;
      flex: none;
    }
    .articleLocation_wrapper {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      justify-content: start;
      border-bottom: 1px solid rgba(146, 146, 146, 0.8);
    }
    .wangeEdit_wrapper {
      flex: 1;
      min-height: 200px;
      overflow: scroll;
    }
    .article_tags {
      width: 100%;
      flex: none;
    }
    .btn_wrapper {
      flex: none;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      height: 60px;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
