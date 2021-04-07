<template>
  <div id="articleTitleList">
    <strong>目录</strong>
    <nav>
      <li v-for="(value, index) of titles" :key="index">
        <a :href="'#'+value.content" :title="value.content">{{value.content}}</a>
      </li>
    </nav>
  </div>
</template>
<script>


import { ParseArticleContentToHs } from "@/utils/ArticleParse.js";

export default {
  name:'ArticleTitleList',
  components:{},
  model:{},
  props:{

  },
  data(){
    return {
      fn:null,
      titles:[],
    }
  },
  computed:{},
  watch:{},
  created(){
  },
  mounted(){
    setTimeout(() => {
      this.titles = ParseArticleContentToHs(document.getElementById("_articleHTML"))
    }, 100);
    this.fn = this.SetTitleNavTop(this.$el);
    window.addEventListener("scroll", this.fn, false);
  },
  updated(){
  },
  beforeDestroy(){
    window.removeEventListener("scroll", this.fn);
  },
  methods:{
    /**
     * 当滚动条举例顶点的距离超过78的时候，那么就将组件的top值设置为0，总体效果为粘性布局
     */
    SetTitleNavTop(el) {
      return function(){
        if(el === undefined || el === null) return;
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
      }
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
    background:white;
    padding:10px ;
    top:86px;
    li {
      line-height: 30px;
      font-size: 15px;
    }
}
</style>