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


export default {
  name:'ArticleTitleList',
  components:{},
  model:{},
  props:{
      titles:{
          type:Array,
          default:()=>{
              return [
                {
                  tag:'h1',
                  content:'官方文档'
                },
              ]
          }
      }
  },
  data(){
    return {
      fn:null,
    }
  },
  computed:{},
  watch:{},
  created(){
  },
  mounted(){
    this.fn = this.SetTitleNavTop(this.$el);
    window.addEventListener("scroll", this.fn, false);
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
        let articleH = 84;
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
    border-radius: 5px;
    padding:10px ;
    li {
      line-height: 30px;
      font-size: 15px;
    }
}
</style>