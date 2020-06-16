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
        <span class="Article_date">{{ item.creatDate | dataInit }}</span>
        <span class="Article_title"> {{ item.articleName }} </span>
      </div>
      <div class="Article_warpper_body">
        摘要：
        <div class="Article_content" >
            {{item.articleContent}}
        </div>
        <router-link
          :to="'/ReadArticle/' + item.articleId"
          class="Article_forward"
        >
          阅读全文
        </router-link>
      </div>
      <div class="Article_warpper_bottom">
        <span class="Article_author">
          {{ item.articleAuthor }}
        </span>
        <span class="Article_readTime"> 阅读数({{ item.read }}) </span>
      </div>
    </div>
    <div class="btn_group">
      <button>上一页</button>
      <button>上一页</button>
      <button>下一页</button>
    </div>
  </div>
</template>
<script>

import {getAllArticle} from '@/network/Article.js';

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
        allAricle : this.allAricleTemp
    };
  },
  created(){
      this.getAllArticle();
  },
  mounted(){
  },
  methods: {
    /**
     * 获取文章
     */
    async getAllArticle() {
      this.$animation.createLoading();
      getAllArticle('/Article/findAll').then((Response)=>{
          this.allAricle = Response.data
      }).catch((err)=>{
          console.log(err);
      })
      this.$animation.cancelLoading();
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

    //   var item_manager = document.createElement("li"); // 编辑
    //   item_manager.addEventListener(
    //     "click",
    //     () => {
    //       console.log(event.target)
    //       let articleId = event.target.getAttribute('data-articleId');
    //       console.log(articleId)
    //       this.$router.push("/EditArticle/" + articleId);
    //     },
    //     false
    //   );
    //   item_manager.setAttribute("class", " g-navHref");
    //   item_manager.innerText = "编辑文章";

    //   var item_delete = document.createElement("li"); // 删除
    //   item_delete.setAttribute("class", " g-navHref");
    //   item_delete.innerText = "删除";

    //   menu.appendChild(item_delete);
    //   menu.appendChild(item_manager);
      menu.appendChild(item_director);
      document.body.appendChild(menu);
    }
  },
  filters:{
      dataInit:function(value) {
        if (!value) return '';
        value = value.toString();
        return value.slice(0,value.indexOf('T'));
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
      .Article_date {
        background: rgb(87, 191, 240);
        padding: 5px;
        color: white;
        line-height: 30px;
        margin-right: 20px;
      }
      .Article_title {
        font-size: 30px;
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
    margin-bottom: 5px;
    box-shadow: 0px 0px 5px 5px rgb(33, 165, 226);
  }
  .btn_group {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>