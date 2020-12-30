<template>
  <div>
    <div class="ReadArticle__top--wrapper g_layout_flex_column g_box-shadow_gray">
      <div class="ArticleMessage--wrapper g_layout_flex_justify-content_space-between">
        <div class="UserMessage--wrapper g_layout_flex_row">
          <div class="UserMessage__profilePhoto g_layout_flex_column_flex_end">
            <span class="profile">{{article.author}}</span>
          </div>
          <div class="g_layout_flex_column_flex_end">
            <strong style="font-size:20px;">{{article.author}}</strong>
            <div class="g_layout_flex_row_flex_end">
              <span style="margin-right:20px">{{article.alertDate | dateInit}}</span>
              <span class="g_tag" v-for="(tag,index) of $StrToArray(article.tags)" :key='index' v-html="tag"></span>
            </div>
          </div>
        </div>
        <div class="guanzhu">关注</div>
      </div>
      <h1>{{article.articleName}}</h1>
    </div>
    <div
      id="ReadArticle"
      v-html="article.articleContent"
      v-on:click.stop.prevent.right="showMenu"
    ></div>
  </div>
</template>
<script>
import {MessageBox} from 'element-ui';

import { getArticle, deleteArticle } from "@/network/Article.js";

export default {
  props: {
    articleCotent: {
      type: String,
      default: "文章内容不存在~"
    }
  },
  data() {
    return {
      article: this.articleCotent,
      articleH: 68 // 文章导航距顶高的初始高度。
    };
  },
  created() {
  },
  mounted() {
    //this.readArticle(this.$route.params.Id);
     this.$store.dispatch('getArticle',
     {
       url:'/Article/find',
       parmas:{id:this.$route.params.Id}
     });
  },
  beforeDestroy() {
  },
  methods: {
    deleteArticleNav() {
      let navWrapper = document.getElementById("ArticleTitleNav");
      if (navWrapper) {
        document.body.removeChild(navWrapper);
      }
    },
    /**
     * 动态导航容器navWrapper的top属性，让它显示在跟文章一个顶部
     */
    changeTitleNavTop(event) {
      let navWrapper = document.getElementById("ArticleTitleNav");
      let articleH = this.articleH;
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //兼容不同的浏览器

      if (top > articleH) {
        navWrapper.style["top"] = 0;
      } else {
        let hight = articleH - top;
        navWrapper.style["top"] = hight + "px";
      }
    },
    /**
     * 根据ele元素里面的h标签创建ele元素的导航
     */
    createArticleTitleNav(ele) {
      /**判断容器是否存在，存在则移除 */
      let navWrapper = document.getElementById("ArticleTitleNav");
      if (navWrapper) {
        document.body.removeChild(navWrapper);
      }
      /**设置导航容器 */
      navWrapper = document.createElement("nav");
      navWrapper.setAttribute("id", "ArticleTitleNav");
      navWrapper.setAttribute(
        "style",
        `
                position: fixed;
                margin: 10px;
                top:  ${this.articleH}px;
                right: 0px;
                width: 300px;
                box-shadow: 0px 0px 5px 5px rgb(146,146,144);
                background:white;
            `
      );

      /**获取ele元素里面的h标签 */
      let sons = ele.getElementsByTagName("*");
      let hsArray = [];
      sons.forEach(element => {
        let tagName = element.nodeName;
        if (tagName[0] === "H") {
          hsArray.push(element);
        }
      });

      /**根据hs标签数组设置ID并为导航容器navWrapper添加a元素标签*/
      let num = 0;
      hsArray.forEach(element => {
        let li = document.createElement("li");
        li.setAttribute(
          "style",` margin:10px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden; `
        );
        let a = document.createElement("a");
        element.setAttribute("id", element.innerText);
        a.setAttribute("href", "#"+element.innerText);
        a.setAttribute('title',element.innerText);
        
        // 根据不同的h标签大小 设置区分
        /*let tagName = element.nodeName;
        switch (tagName) {
          case "H1":
            li.setAttribute("style", `text-indent:0px`);
            break;
          case "H2":
            li.setAttribute("style", `text-indent:4px`);
            break;
          case "H3":
            li.setAttribute("style", `text-indent:8px`);
            break;
          case "H4":
            li.setAttribute("style", `text-indent:16px`);
            break;
          case "H5":
            li.setAttribute("style", `text-indent:32px`);
            break;
          case "H6":
            li.setAttribute("style", `text-indent:64px`);
            break;
        }*/

        a.innerText = element.innerText;
        li.appendChild(a);
        navWrapper.appendChild(li);
        num++;
      });

      /**设置监听，动态导航容器navWrapper的this.articleH属性，让它显示在跟文章一个顶部 */

      window.addEventListener("scroll", this.changeTitleNavTop, false);

      document.body.appendChild(navWrapper);
    },
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
          MessageBox.confirm(`此操作将永久删除<strong style='color:red;padding:0 10px'>${this.article.articleName} (文件)</strong>, 是否继续?`, '提示', {
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
    }
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

  watch: {
    $route(to, from) {
      //this.readArticle(this.$route.params.Id);
      this.$store.dispatch('getArticle',
        {
          url:'/Article/find',
          parmas:{id:this.$route.params.Id}
        });
    },
    "$store.state.article.article":function(){
      this.article = this.$store.getters.getArticle;
      console.log(this.article)
    }
  }
};
</script>

<style lang="less" scoped>
#ReadArticle {
  position: relative;
  padding: 30px;
  background: white;
  box-shadow: 0px 0px 5px 5px rgb(146, 146, 144);
  border-radius: 10px;
  line-height: 27px;
  word-wrap: break-word;
}
.UserMessage__profilePhoto {

  .profile{
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #006699;
    color: white;
    margin-bottom: 0px;
    margin-right: 10px;
  }
}
.ArticleMessage--wrapper {
  align-items: center;
  .guanzhu {
    margin: 20px;
    padding: 0;
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #6cbd45;
    color: #6cbd45;
    background-color: #fff;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
  }
}
.ReadArticle__top--wrapper{
  padding: 15px;
  z-index: 99;
}
</style>