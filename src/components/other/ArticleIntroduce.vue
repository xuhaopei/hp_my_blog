<template>
  
<div class="ArticleIntroduce">
    <div class="Article_warpper">
      <div class="Article_warpper_top">
        <div class='left'>
          <span class="Article_date">{{ article.alertDate | dateInit }}</span>
          <el-button-group>
            <el-button type="default" size="mini" icon="el-icon-thumb">{{article.like}}</el-button>
            <el-button type="default" size="mini" icon="el-icon-chat-square">{{article.comments}}</el-button>
            <el-button type="default" size="mini" icon="el-icon-share"></el-button>
          </el-button-group>
        </div>
      </div>
      <div class="Article_warpper_body">
          <router-link
            :to="'/Home/ReadArticle/' + article.id"
            class="Article_title"
            v-html="article.articleName "
          >
          </router-link>
      </div>
      <div class="Article_warpper_bottom">
        <div class="Article_tags">
                <el-tag
                    v-for="(tag,index) of TagsToArray(article.tags)" 
                    :key='index' 
                    type="info"
                    effect="plain"
                    style="margin-right:10px"
                    >
                    {{tag}}
                </el-tag>
        </div>
        <div class="Article-btns-control_wrapper">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {
  searchArticle, 
  getSearchAllArticleNumber,
  } from '@/network/Article.js';

import {TagsToArray} from '@/utils/StrToArray.js'

export default {
  props: {
    article: {
      type: Object,
      default: function() {
        return     {
              alertDate: "2021-02-04T01:15:33.000Z",
              articleName: "存储1",
              id: 150,
              pid: 97,
              tags: '浏览器,服务器,必会,cookie',
              like:'6',
              comments:'3',
        }
      }
    }
  },
  data() {
    return {
    };
  },
  created(){
      
  },
  mounted(){
    // this.initPage();
  },
  methods: {
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
        menu.parentNode.removeChild(menu);
      });

      var item_director = document.createElement("li"); // 创建文章
      item_director.addEventListener(
        "click",
        () => {
          this.$router.push("/CreateArticle");
        },
        false
      );
      item_director.setAttribute("class", " g-navHref");
      item_director.innerText = "创建文章";
      menu.appendChild(item_director);
      document.body.appendChild(menu);
    },

    /**
     * enter按钮查询文章
     */
    async searchArticle(content,pageId){
      await getSearchAllArticleNumber('/Article/queryArticleSum',content).then((Response)=>{
         this.page.total = Response.data[0]['COUNT(*)'];
         this.page.size  = 7;
         this.page.count = 10;
         this.page.current = 1;
       });
      await searchArticle('/Article/query',content,pageId).then((Response)=>{
        this.allAricle = Response.data;
        this.derecoterContent(this.allAricle,content);
      })
      
    },
    /**
     * 根据页码请求数据
     */
    async getSomeArticle(pageId){
      
      let searchContent = this.$store.state.searchArticleContent;
      this.$router.push(`/AllArticle/${pageId}`);
      await searchArticle('/Article/query',searchContent,pageId).then((Response)=>{
          this.allAricle = Response.data;
          this.derecoterContent(this.allAricle,searchContent)
      }).catch(err=>{
        console.log(err)
      })
    },
    /**
     * 初始化数据
     */
    async initPage(){
       let content = document.getElementById('hp_searchContent').value; // 获取搜索框的内容
       let pageId = this.$route.params.pageId || 1;
       this.page.current = pageId;
       this.searchArticle(content,pageId);
    },
    /**
     * 将文章的标题，跟标签添加一些元素
     */
    derecoterContent(AllArticle,content){
        let reg = new RegExp(`${content}`,`ig`);
        AllArticle.forEach(v=>{
            v.tags = v.tags.replace(reg,`<span style="color: red;">${content}</span>`);
            v.articleName = v.articleName.replace(reg,`<span style="color: red;">${content}</span>`);
        })
    },
    TagsToArray:TagsToArray,
  },
  computed:{
  },
  watch:{
  }
};
</script>
<style lang="less">
.ArticleIntroduce {
  position: relative;
  min-width: 400px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  .Article_warpper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    .Article_warpper_top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      .Article_date {
        padding: 5px;
        color: gray;
        margin-right: 20px;
      }
      .Article_title {
        font-size: 30px;
      }
    }
    .Article_warpper_body {
      position: relative;
      margin-top: 5px;
      margin-bottom: 15px;
      .Article_content {
        text-indent: 20px;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow:ellipsis;
      }
      .Article_forward {
        display: block;
        color: rgb(93, 243, 93);
      }
      .Article_title {
        font-weight: 600;
        font-size: 22px;
        line-height: 30px;
      }
    }
    .Article_warpper_bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: rgba(104, 37, 37, 0.4);
      font-size: 12px;
      flex-wrap: wrap;
      .Article_author {
        margin-right: 10px;
      }
      .Article_tags {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: start;
          flex-wrap: wrap;
      }
      .Article-btns-control_wrapper{

      }
    }
  }
  .pageControl_wrapper {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
  }
}

</style>