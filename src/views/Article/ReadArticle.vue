<template>
    <div id="ReadArticle" v-html="article.articleContent">
    </div>
</template>
<script>

import {getArticle} from '@/network/Article.js';

export default {
    props:{
        articleCotent:{
            type:String,
            default:'文章内容不存在~'
        }
    },
    data(){
        return {
            article:this.articleCotent
        }
    },
    created(){
        this.readArticle(this.$route.params.Id);
    },
    methods:{
        async readArticle(articleId){
            this.$animation.createLoading();
            getArticle('/Article/find',articleId).then((Response)=>{
                this.article = Response.data;
            }).catch((err)=>{
                console.log(err);
            })
            this.$animation.cancelLoading();
        }
    },
    watch:{
        $route(to, from) {
            this.readArticle(this.$route.params.Id);
        }
  }
}
</script>

<style lang="less" scoped>
#ReadArticle {
    position: relative;
    padding: 30px;
    background: white;
    margin: 10px 0px 0px 10px;
    box-shadow: 0px 0px 5px 5px rgb(146,146,144);
    border-radius:10px
}
</style>