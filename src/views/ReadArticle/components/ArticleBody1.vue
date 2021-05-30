<!--
显示文章内容
-->
<template>
  <div
    id="ReadArticle"
    class="ArticleBody"
    v-on:click.right.prevent="showMenu($event)"
  >
    <MarkDown
      v-model="article.articleContent"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      ref="md"
    ></MarkDown>
    <!-- 动态创建子目录 -->
    <MenuItem :visible.sync="visible" :event="event">
      <a @click="deleteHandle()">删除文章</a>
      <a @click="updateHandle()">编辑文章</a>
      <a @click="addHandle()">创建文章</a>
    </MenuItem>
    <!-- 文章导航 -->
    <ArticleTitleList ></ArticleTitleList>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import MenuItem from "@/components/other/MenuItem.vue";
import { MessageBox } from "element-ui";
import { httpDeleteArticles } from "@/network/Article.js";
import ArticleTitleList from "./ArticleTitleList.vue";
export default {
  name: "ArticleBody",
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          alertDate: "",
          articleContent: "无内容",
          articleContentText: "",
          articleName: "",
          author: "",
          id: 0,
          pid: 0,
          read: 0,
          tags: "",
        };
      },
    },
  },
  components: {
    MarkDown: mavonEditor,
    MenuItem,
    ArticleTitleList,
  },
  data() {
    return {
      visible: false,
      event: new PointerEvent(""),
      titles: [],
    };
  },
  mounted() {

  },
  updated() {
  },
  methods: {
    /**
     * 右击弹出菜单
     */
    showMenu(event) {
      this.event = event;
      this.visible = true;
    },
    addHandle() {
      this.$router.push({
        path: "/CreateArticle",
      });
    },
    deleteHandle() {
      this.visible = false;
      MessageBox.confirm(`此操作将永久删此页面, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
      }).then(() => {
        httpDeleteArticles([this.$route.params.Id])
          .then(() => {
            this.$router.push({
              path: "/",
            });
          })
          .catch((err) => {
            this.$message({
              message: "无权限操作",
              type: "error",
            });
          });
      });
    },
    updateHandle() {
      this.$router.push({
        path: `/EditArticle/${this.$route.params.Id}`,
      });
    },
    /**
     * 动态导航容器navWrapper的top属性，让它显示在跟文章一个顶部
     */
    changeTitleNavTop(event) {
      let navWrapper = document.getElementsByClassName(
        "v-note-navigation-wrapper"
      )[0];
      let articleH = 88;
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //兼容不同的浏览器
      if (top > articleH) {
        navWrapper.style["top"] = 0;
      } else {
        let hight = articleH - top;
        navWrapper.style["top"] = hight + "px";
      }
    },
  },
};
</script>
<style>
.v-note-navigation-wrapper {
  position: fixed !important;
  right: 0;
}
</style>
<style lang="less" scoped>
.ArticleBody {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: white;
}
</style>
