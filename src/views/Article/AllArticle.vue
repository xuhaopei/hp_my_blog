<template>
  <div id="AllArticle">
    <div
      class="Article_warpper"
      v-for="(item, index) of allAricle"
      :key="index"
      v-on:click.stop.prevent.right="showMenu"
      :data-articleId='item.articleId'
    >
      <div class="Article_warpper_top">
        <div class='left'>
          <span class="Article_date">{{ item.alertDate | dateInit }}</span>
          <router-link
            :to="'/ReadArticle/' + item.id"
            class="Article_title"
            v-html="item.articleName "
          >
          </router-link>
        </div>
        <div class="Article_tags">
              <span v-for="(tag,index) of tagsInit(item.tags)" :key='index' v-html="tag"></span>
        </div>
      </div>
      <div class="Article_warpper_body">
        摘要：
        <div class="Article_content" v-text="item.articleContentText">
        </div>
        <router-link
          :to="'/ReadArticle/' + item.id"
          class="Article_forward"
        >
          阅读全文
        </router-link>
      </div>
      <div class="Article_warpper_bottom">
        <span class="Article_author">
          {{ item.author }}
        </span>
        <span class="Article_readTime"> 阅读数({{ item.read }}) </span>
      </div>
    </div>
    
    <div class="pageControl_wrapper">
      <keep-alive>
        <el-pagination
          background
          layout="prev, pager, next"
          v-on:current-change='getSomeArticle'
          :page-size="page.size"
          :pager-Count="page.count"
          :total="page.total"
          :current-page="parseInt(page.current)">
        </el-pagination>
      </keep-alive>
    </div>
    
  </div>
</template>
<script>

import {
  searchArticle, 
  getSearchAllArticleNumber,
  } from '@/network/Article.js';

export default {
  props: {
    allAricleTemp: {
      type: Array,
      default: function() {
        return [
          {
            articleId: 1,
            articleName: "xhp",
            articleContent: "123",
            creatDate: "20134221",
            articleAuthor: "正义的键盘侠",
            read: 100
          },

          {
            articleId: 1,
            articleName: "xhp",
            articleContent:
              "12zxcasasasasasasasasasasasasasasasasaasdzxcjhbascjhgzxkcgssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaksasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasas3",
            creatDate: "20134221",
            articleAuthor: "正义的键盘侠",
            read: 100
          },
          {
            articleId: 1,
            articleName: "xhp",
            articleContent: "123",
            creatDate: "20134221",
            articleAuthor: "正义的键盘侠",
            read: 100
          }
        ];
      }
    }
  },
  data() {
    return {
        allAricle : this.allAricleTemp,
        page:{        
            total:100,            // 数据总共的条数
            size:7,               // 当前页显示的数量
            count:5,              // 可选择的分页按钮数量
            current:1,            // 当前页码数
        }
    };
  },
  created(){
      
  },
  mounted(){
    this.initPage();
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

      /*
        var item_manager = document.createElement("li"); // 编辑
        item_manager.addEventListener(
          "click",
          () => {
            console.log(event.target)
            let articleId = event.target.getAttribute('data-articleId');
            console.log(articleId)
            this.$router.push("/EditArticle/" + articleId);
          },
          false
        );
        item_manager.setAttribute("class", " g-navHref");
        item_manager.innerText = "编辑文章";

        var item_delete = document.createElement("li"); // 删除
        item_delete.setAttribute("class", " g-navHref");
        item_delete.innerText = "删除";

        menu.appendChild(item_delete);
        menu.appendChild(item_manager);
      */
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
     * 初始标签
     */
    tagsInit:function(value) {
        if(!value) return '';
        value = value.toString();
        return value.split(',');
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
    }
  },
  filters:{
      dateInit:function(value) {
        if (!value) return '';
        value = value.toString();
        return value.slice(0,value.indexOf('T'));
      },
  },
  computed:{
  },
  watch:{
    ['$store.state.searchArticleContent']:function(){
         let pageId = this.$route.params.pageId || 1;
         this.searchArticle(this.$store.state.searchArticleContent,pageId);
    }
  }
};
</script>
<style lang="less">
#AllArticle {
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1080px;
  .Article_warpper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    background: white;
    border-radius: 10px;
    padding: 15px 25px;
    box-shadow: 0px 0px 5px 5px rgb(146, 146, 144);
    display: flex;
    flex-direction: column;
    .Article_warpper_top {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      justify-content: space-between;
      align-items: baseline;
      .Article_date {
        background: rgb(87, 191, 240);
        padding: 5px;
        color: white;
        margin-right: 20px;
      }
      .Article_title {
        font-size: 30px;
      }
      .Article_tags > span{
         border-radius:7px ;
          padding: 5px;
          margin-right: 20px;
          color: white;
          background: rgba(104, 37, 37, 0.4);
      }
    }
    .Article_warpper_body {
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      font-size: 16px;
      line-height: 25px;
      .Article_content {
        text-indent: 32px;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow:ellipsis;
      }
      .Article_forward {
        display: block;
        color: rgb(93, 243, 93);
      }
    }
    .Article_warpper_bottom {
      display: flex;
      flex-direction: row;
      color: rgba(104, 37, 37, 0.4);
      font-size: 12px;
      .Article_author {
        margin-right: 10px;
      }
    }
  }
  .Article_warpper:hover {
    box-shadow: 0px 0px 5px 5px rgb(33, 165, 226);
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