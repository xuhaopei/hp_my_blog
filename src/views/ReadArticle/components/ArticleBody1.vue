<template>
  <div id="ReadArticle" class="ArticleBody">
      <div v-html="article.articleContent"></div>
  </div>
</template>

<script>

export default {
    name:'ArticleBody',
    props:{
        article:{
            type:Object,
            default:()=>{
                return {
                    alertDate:'',
                    articleContent:'无内容',
                    articleContentText:'',
                    articleName:'',
                    author:'',
                    id:0,
                    pid:0,
                    read:0,
                    tags:''
                }
            }
        }
    },
    mounted(){
    },
    updated(){
        this.SetAllHsId(this.$el);
    },
    methods:{
        SetAllHsId(ele) {
            /**获取ele元素里面的h标签 */
            if(ele == null) return;
            let sons = ele.getElementsByTagName("*");
            let hsArray = [];
            sons.forEach((element) => {
                let tagName = element.nodeName;
                if (tagName[0] === "H") {
                hsArray.push(element);
                }
            });

            hsArray.forEach((v)=>{
                v.setAttribute('id', v.innerText);
            })

        }
    },
};
</script>

<style lang="less" scoped>
    .ArticleBody {
        padding: 10px;
        margin-top:20px;
        background: white;
    }
</style>