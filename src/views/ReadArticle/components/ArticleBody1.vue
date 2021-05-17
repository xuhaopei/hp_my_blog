<!--
显示文章内容
-->
<template>
  <div
    id="ReadArticle"
    class="ArticleBody"
    v-on:click.right.prevent="showMenu($event)"
  >
    <div v-html="article.articleHtml" id="_articleHTML" ref="articleHTML"></div>
    <!-- 动态创建子目录 -->
    <MenuItem :visible.sync="visible" :event="event">
      <a @click="deleteHandle()">删除文章</a>
      <a @click="updateHandle()">编辑文章</a>
      <a @click="addHandle()">创建文章</a>
    </MenuItem>
  </div>
</template>

<script>
import MarkDown from "@/components/other/MarkDown";
import MenuItem from "@/components/other/MenuItem.vue";

import { MessageBox } from "element-ui";
import { httpDeleteArticles } from "@/network/Article.js";
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
    MarkDown,
    MenuItem,
  },
  data() {
    return {
      visible: false,
      event: new PointerEvent(""),
    };
  },
  mounted() {},
  updated() {
    this.SetAllHsId(this.$refs["articleHTML"]);
  },
  methods: {
    SetAllHsId(ele) {
      /**获取ele元素里面的h标签 */
      if (ele == null) return;
      let sons = ele.getElementsByTagName("*");
      let hsArray = [];
      sons.forEach((element) => {
        let tagName = element.nodeName;
        if (tagName[0] === "H") {
          hsArray.push(element);
        }
      });

      hsArray.forEach((v) => {
        v.setAttribute("id", v.innerText);
      });
    },
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
  },
};
</script>

<style lang="less" scoped>
.ArticleBody {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  background: white;
}
</style>
