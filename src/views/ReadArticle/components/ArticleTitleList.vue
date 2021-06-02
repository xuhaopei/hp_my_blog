<template>
  <div id="articleTitleList">
    <strong class="title">文章导航</strong>
    <nav>
      <li v-for="(value, index) of titles" :key="index" :class="value.nodeName">
        <a :href="'#' + value.innerText" :title="value.innerText">{{
          value.innerText
        }}</a>
      </li>
    </nav>
  </div>
</template>
<script>
import { ParseArticleContentToHs } from "@/utils/ArticleParse.js";
import {
  domHandle_setId,
  domHandle_getHs,
  domHandle_changePosition,
} from "@/utils/dom.js";

export default {
  name: "ArticleTitleList",
  components: {},
  model: {},
  props: {},
  data() {
    return {
      titles: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.titles = domHandle_setId(
        domHandle_getHs(document.getElementsByClassName("v-note-show")[0])
      );
    }, 300);
    domHandle_changePosition(this.$el, 88);
    window.addEventListener(
      "scroll",
      () => {
        domHandle_changePosition(this.$el, 88);
      },
      false
    );
  },
  updated() {},
  beforeDestroy() {},
  methods: {
    /**
     * 当滚动条举例顶点的距离超过78的时候，那么就将组件的top值设置为0，总体效果为粘性布局
     */
    SetTitleNavTop(el) {
      return function() {
        if (el === undefined || el === null) return;
        let articleH = 86;
        const top =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop; //兼容不同的浏览器

        if (top > articleH) {
          el.style["top"] = 0;
        } else {
          let hight = articleH - top;
          el.style["top"] = hight + "px";
        }
      };
    },
  },
};
</script>
<style lang="less">
#articleTitleList {
  position: fixed;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: white;
  padding: 10px;
  top: 86px;
  width: 13vw;
  right: 3vw;
  li {
    line-height: 30px;
    font-size: 15px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
  .title{
    display: block;
    font-size: 18px;
    padding:0.5vw 0;
    border-bottom:1px solid rgba(0,0,0,0.1);
  }
  .H1{
    font-weight: 600;
    margin-left: 0vw;
  }
  .H2{
    margin-left: 1.5vw;
    font-weight: 500;
  }
  .H3{
    margin-left: 3vw;
    font-weight: 400;
  }
  .H4{
    margin-left: 4.5vw;
    font-weight: 300;
  }
  .H5{
    margin-left: 6vw;
    font-weight: 200;
  }
  .H6{
    margin-left: 7.5vw;
    font-weight: 100;
  }
}
</style>
