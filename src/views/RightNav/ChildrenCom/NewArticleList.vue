<template>
  <div id="newArticleList" class='g_box-shadow_gray'>
    <span class="title_h1"><i class="iconfont icon-zuixintijiao"></i>最近更新</span>
    <ul>
      <li class="g-mouseMoveOnNav g_text_shengluehao " v-for="(obj, index) of nearArticles" :key="index">
        <router-link :to='"/ReadArticle/"+obj.id'>{{ obj.articleName }} </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nearArticles: [],
    };
  },
  mounted(){
    this.$store.dispatch('getSomeNearArticle',{
      url:'/Article/findNear',
    }).then((data)=>{
      this.nearArticles = data;
    });
  },
  watch:{

  }
};
</script>
<style lang="less">
#newArticleList {
  box-sizing: border-box;
  display: flex;
  min-width: 250px;
  flex-direction: column;
  padding:10px;
  .title_h1{
      font-weight: 300;
      font-size: 30px;
  }
  .icon-zuixintijiao {
    position: relative;
    width: 20px;
    height: 30px;
    font-size: 30px;
    margin-right: 15px;
  }
  ul > li {
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 15px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
      Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
    font-variant: tabular-nums;
    line-height: 1.5;
    font-feature-settings: "tnum";
  }
}
</style>