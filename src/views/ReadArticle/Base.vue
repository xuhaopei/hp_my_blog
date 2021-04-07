<!--
功能：
显示文章内容，对文章进行创建、编辑、删除
-->
<template>
  <div  class="ReadArticle">
      <el-row :gutter="20">
          <!-- 文章的主体 -->
          <el-col :span="16" :offset="2" >
            <!-- 文章头部信息 -->
            <article-header  :article="article"></article-header>
            <!-- 文章内容 -->
            <article-body  :article="article"></article-body>
            <!-- 评论 -->
            <div class="comment-wrapper">
              <ReplyCom @success="commentSubmit"></ReplyCom>
              <show-com v-for="(comment,index) of comments" :key="index" :comment="comment" @success="getComments()"></show-com>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- 文章目录 -->
            <article-title-list ></article-title-list>
          </el-col>
      </el-row>
  </div>
</template>
<script>
// 组件
import ArticleHeader from  '@/views/ReadArticle/components/ArticleHeader.vue';
import ArticleBody from  '@/views/ReadArticle/components/ArticleBody1.vue';
import ArticleTitleList from    '@/views/ReadArticle/components/ArticleTitleList.vue';
import ShowCom from    '@/views/ReadArticle/components/ShowCom.vue';
import ReplyCom from    '@/views/ReadArticle/components/ReplyCom.vue';

import {MessageBox} from 'element-ui';

// 请求
import {httpArticleQueryOne } from "@/network/Article.js";
import {httpCommentAdd,httpCommentQuery } from "@/network/Comment.js";

// 全局方法
import { ParseArticleContentToHs } from "@/utils/ArticleParse.js";

export default {
  name:'ReadArticle',
  components:{
      'article-header':ArticleHeader,
      'article-body':ArticleBody,
      "article-title-list":ArticleTitleList,
      'show-com':ShowCom,
      ReplyCom,
  },  
  props: {
  },
  data() {
    return {
      titles:[],
      // 模拟评论数据
      comments:[
        {
          content:'1',
          date:'2020-12-15T13:23:59.000Z',
          commentId:1,
          commentPId:0,
          userId:0,
          children:[
            {
              content:'1-1',
              date:'2020-12-15T13:23:59.000Z',
              commentId:3,
              commentPId:2,
              children:[
                {
                  content:'1-1-1',
                  date:'2020-12-15T13:23:59.000Z',
                  commentId:3,
                  commentPId:2,
                  children:[]
                }
              ]
            },
            {
              content:'1-2',
              date:'2020-12-15T13:23:59.000Z',
              commentId:3,
              commentPId:2,
              children:[
                {
                  content:'1-2-1',
                  date:'2020-12-15T13:23:59.000Z',
                  commentId:3,
                  commentPId:2,
                  children:[]
                }
              ]
            },            
          ],
        },        
      ],
      article:{},
      articleHtml:'',
    };
  },
  beforeCreate(){
  },
  created() {
  },
  mounted() {
    this.readArticle();
    this.titles = ParseArticleContentToHs(document.getElementById("_articleHTML"));
    this.getComments(this.$route.params.Id);
  },
  updated(){
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * 提交评论
     */
    commentSubmit(event){
      let content = event.data.content;
      if(content === '') {
          this.$message({
            message: "请您输入内容",
            type: 'error'
        });
        return;
      }

      let aId = this.article.id;
      let uId = this.$store.state.people.user.id;
      let userName = this.$store.state.people.user.userName;
      let path = '/' + aId;
      let pId = aId;
      
      httpCommentAdd(aId,uId,userName,content,path,pId)
      .then((respone)=>{
          this.$message({
            message: "评论成功",
            type: 'success'
        });
        this.getComments(this.$route.params.Id);
      })
      .catch((err)=>{

      })
    },
    /**
     * 根据文章id获取文章内容
     */
    async readArticle() {
     await httpArticleQueryOne(this.$route.params.Id)
        .then(Response => {
          this.article = Response.data;
        })
    },
    /**
     * 根据文章ID删除文章
     */
    async deleteArticle1(articleId) {
      await deleteArticle("/Article/delete", articleId)
        .then(Response => {
          this.$router.push("/");
        });
    },
    async getComments(articleId = this.$route.params.Id) {
      httpCommentQuery(articleId)
      .then((Response)=>{
        this.comments = Response.data;
      }).catch((err)=>{

      })
    }
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch('getArticle',
        {
          url:'/Article/find',
          parmas:{id:this.$route.params.Id}
        });
    },
    '$store.state.article.article':function(){
      this.$nextTick(()=>{
        let article = this.$store.getters.getArticle;
        this.titles = this.ParseArticleContentToHs(this.$el);
      })
    },
  },
};
</script>

<style lang="less" scoped>
.ReadArticle {
  margin-top:26px;
  overflow-x: hidden;
  .comment-wrapper{
    background-color: #FFFFFF;
    padding:10px 30px;
    border-top: 1px solid rgba(0,0,0,0.1);
  }
}
</style>