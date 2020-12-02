<template>
  <div id="articleTitleList">

  </div>
</template>
<script>
export default {
  data() {
    return {
      articleH: 78 // 文章导航距顶高的初始高度。
    };
  },
  methods: {
    /**
     * 动态导航容器navWrapper的top属性，让它显示在跟文章一个顶部
     */
    changeTitleNavTop(event) {
      let navWrapper = document.getElementById("articleTitleList");
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
         document.getElementById('articleTitleList')&&document.getElementById('articleTitleList').removeChild(navWrapper);
      }
      /**设置导航容器 */
      navWrapper = document.createElement("nav");
      navWrapper.setAttribute("id", "ArticleTitleNav");
      navWrapper.setAttribute(
        "style",
        `
                position: relative;
                top:  0;
                right: 0px;
                width: 100%;
                box-shadow: 0px 0px 5px 5px rgb(146,146,144);
                background:white;
                border-radius: 5px;
                padding:5px 0;
            `
      );

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
      
      /**根据hs标签数组设置ID并为导航容器navWrapper添加a元素标签*/
      let num = 0;
      hsArray.forEach((element) => {
        let li = document.createElement("li");
        li.setAttribute(
          "style",  
          `         overflow: hidden;
                    margin:10px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden; `
        );
        let a = document.createElement("a");
        element.setAttribute("id", element.innerText);
        a.setAttribute("href", "#" + element.innerText);
        a.setAttribute("title", element.innerText);

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
      document.getElementById('articleTitleList').appendChild(navWrapper);

    },
  },
  watch:{
    $route(to, from) {
      to.name === 'ReadArticle' ? setTimeout(() => {
        this.createArticleTitleNav(document.getElementById('ReadArticle'));  
      }, 100):'';
    },
    "$store.state.article.article":function(){
      setTimeout(() => {
        this.createArticleTitleNav(document.getElementById('ReadArticle'));  
      }, 100);
    }
  },
};
</script>
<style lang="less">
#articleTitleList {
  position: fixed;
  width: 280px;
  top: 78px;
}
</style>