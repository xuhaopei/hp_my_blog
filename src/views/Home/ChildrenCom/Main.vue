<template>
  <div class="Main">
    <el-row>
      <!-- 标签选项 -->
      <!-- <small-links :links="links"></small-links> -->
      <el-col :span="20" :offset="2" style="margin-top:2vw">
        <el-row :gutter="30">
          <!-- 热门、最新 -->
          <el-col :span="18" style="background:white;overflow:hidden">
            <el-tabs
              type="card"
              v-model="activeName"
              @tab-click="handleClick"
              style="padding:10px"
            >
              <el-tab-pane label="最新" name="first">
                <article-introduce
                  v-for="(article, index) of articles"
                  :key="index"
                  :article="article"
                ></article-introduce>
              </el-tab-pane>
              <!-- <el-tab-pane label="热门" name="second">
                <all-article></all-article>
              </el-tab-pane> -->
            </el-tabs>
          </el-col>
          <el-col :span="6">
            <!-- 作者榜 -->
            <!-- <study></study> -->
            <!-- 计划表 -->
            <calender-plan></calender-plan>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Study from "@/views/Announcement/Study.vue";
import SmallLinks from "@/components/other/SmallLinks.vue";
import ArticleIntroduce from "@/components/other/ArticleIntroduce.vue";
import CalenderPlan from "@/components/other/CalenderPlan.vue";

import { throttle } from "@/utils/throttle.js";

import {
  httpArticleQuery,
  httpArticleQueryByUIdAndContent,
} from "@/network/Article.js";

export default {
  name: "Main",
  components: {
    "small-links": SmallLinks,
    "article-introduce": ArticleIntroduce,
    study: Study,
    "calender-plan": CalenderPlan,
  },
  model: {},
  props: {},
  data() {
    return {
      activeName: "first",
      articles: [
      ],
      start: 0, // 请求数据的起始值
      sum: 10, // 请求数据的量
    };
  },
  computed: {},
  // 进入此组件,组件还没渲染
  beforeRouteEnter(to, from, next) {
    next();
  },
  // 离开此组件
  beforeRouteLeave(to, from, next) {
      throttle.removeScrool();
      this.start = 0;
      this.articles = [];
      next();
  },
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
  beforeDestory() {
    throttle.removeScrool();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /**
     * 获取数据
     */
     getData(start = 0, end = 5) {
      let content = this.$route.query.content ? this.$route.query.content : "";
      let uId = this.$route.query.uId;
      uId
        ? httpArticleQueryByUIdAndContent(uId, content, start, end)
            .then((response) => {
              this.articles = response.data;
              this.start += this.sum;
              
            })
            .catch((err) => {
              this.articles = [];
              this.start = 0;
            })
        : httpArticleQuery(content, start, end)
            .then((response) => {
              this.articles = response.data;
              this.start += this.sum;
            })
            .catch((err) => {
              this.articles = [];
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
         let content = _this.$route.query.content
            ? _this.$route.query.content
            : "";
          let uId = _this.$route.query.uId;
          uId
            ? httpArticleQueryByUIdAndContent(uId, content, _this.start,   _this.sum)
                .then((response) => {
                  response.data.forEach(element => {
                    _this.articles.push(element);
                  });
                 _this.start += _this.sum;
                  resolve();
                })
                .catch((err) => {
                  reject();
                })
            : httpArticleQuery(content, _this.start, _this.sum)
                .then((response) => {
                  response.data.forEach(element => {
                    _this.articles.push(element);
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

<style></style>
