<template>
  <div id="articleTitleList">
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
        let articleH = 78;
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
    top:78px;
    width: 283px;
    right: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background: white;
    box-shadow: 0px 0px 5px 5px rgb(146,146,144);
    background:white;
    border-radius: 5px;
    padding:5px 0;
    li {
      line-height: 40px;
      font-size: 18px;
    }
}
</style>