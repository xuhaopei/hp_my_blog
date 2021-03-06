<!--
功能：
显示文章内容，对文章进行创建、编辑、删除
-->
<template>
  <div v-on:click.stop.prevent.right="showMenu"  class="ReadArticle">
    <el-container>
      <el-row :gutter="20">
          <!-- 文章的主体 -->
          <el-col :span="16" :offset="2" >
            <!-- 文章头部信息 -->
            <article-header  :article="$store.getters.getArticle"></article-header>
            <!-- 文章内容 -->
            <article-body  :article="$store.getters.getArticle"></article-body>
            <!-- 评论 -->
            <div class="comment-wrapper">
              <show-com v-for="(comment,index) of comments" :key="index" :comment="comment"></show-com>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- 文章目录 -->
            <article-title-list :titles="titles"></article-title-list>
          </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
// 组件
import ArticleHeader from  '@/views/ReadArticle/components/ArticleHeader.vue';
import ArticleBody from  '@/views/ReadArticle/components/ArticleBody1.vue';
import ArticleTitleList from    '@/views/ReadArticle/components/ArticleTitleList.vue';
import ShowCom from    '@/views/ReadArticle/components/ShowCom.vue';

import {MessageBox} from 'element-ui';

// 请求
import {getArticle, deleteArticle } from "@/network/Article.js";

// 全局方法
import { ParseArticleContentToHs } from "@/utils/ArticleParse.js";

export default {
  name:'ReadArticle',
  components:{
      'article-header':ArticleHeader,
      'article-body':ArticleBody,
      "article-title-list":ArticleTitleList,
      'show-com':ShowCom,
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
      ]
    };
  },
  beforeCreate(){
  },
  created() {
    
  },
  mounted() {
     this.$store.dispatch('getArticle',
     {
       url:'/Article/find',
       parmas:{id:this.$route.params.Id}
     });
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * 根据文章id获取文章内容
     */
    async readArticle(articleId) {
      await getArticle("/Article/find", articleId)
        .then(Response => {
          this.article = Response.data;
          console.log(this.article)
        })
        .catch(err => {
          console.log(err);
        });
      //this.createArticleTitleNav(document.getElementById("ReadArticle"));
    },
    /**
     * 右击弹出菜单
     */
    showMenu(event) {
      // 创建菜单容器
      var menu = document.createElement("ul");
      menu.setAttribute("id", "HpNavItem_menu");
      menu.style["left"] = event.pageX - 10 + "px";
      menu.style["top"] = event.pageY - 10 + "px";
      // 设置离开菜单的时候菜单消失
      menu.addEventListener("mouseleave", function(event) {
        menu.parentNode && menu.parentNode.removeChild(menu);
      });

      var item_director = document.createElement("li"); // 创建文章
      item_director.addEventListener(
        "click",
        () => {
          this.$router.push("/CreateArticle");
          window.document.documentElement.scrollTop = 0;    // 滚动条滚回顶部
        },
        false
      );
      item_director.setAttribute("class", " g-navHref");
      item_director.innerText = "创建文章";

      var item_manager = document.createElement("li"); // 编辑
      item_manager.addEventListener(
        "click",
        () => {
          let articleId = this.$route.params.Id;
          this.$router.push("/EditArticle/" + articleId);
          window.document.documentElement.scrollTop = 0;    // 滚动条滚回顶部
        },
        false
      );
      item_manager.setAttribute("class", " g-navHref");
      item_manager.innerText = "编辑文章";

      var item_delete = document.createElement("li"); // 删除
      item_delete.addEventListener(
        "click",
        () => {
          MessageBox.confirm(`此操作将永久删除<strong style='color:red;padding:0 10px'>${this.$store.state.article.article.articleName} (文件)</strong>, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
          }).then(() => {
              let articleId = this.$route.params.Id;
              deleteArticle("/Article/delete", articleId)
                .then(Response => {   
                  this.$router.push("/");
              });
          }).catch(() => {

          });
        },
        false
      );
      item_delete.setAttribute("class", " g-navHref");
      item_delete.innerText = "删除";

      menu.appendChild(item_delete);
      menu.appendChild(item_manager);
      menu.appendChild(item_director);
      document.body.appendChild(menu);
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
    ParseArticleContentToHs:ParseArticleContentToHs,
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
  }
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