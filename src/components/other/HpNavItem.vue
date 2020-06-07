<!--这是导航模块-->
<template>
  <div id="HpNavItem">
    <!--zone代表每个学习区-->
    <div v-for="(zone, index) in data" :key="index">
      <div
        class="HpNavItem-title   g_layout_flex_justify-content_space-between g-navHref"
        v-on:click="showMsg(index, $event)"
        v-on:click.right="showMenu"
        style="text-indent:10px"
      >
        {{ zone.title }}
        <i class="iconfont icon-sanjiaoxing"></i>
      </div>
      <div class="HpNavItem-body" flage="false">
        <!--article代表文章信息，如果article的长度大于0说明是区，则递归调用此组件-->
        <div
          class="HpNavItem-item "
          v-for="(article, index) in zone.smallItems"
          :key="index"
        >
          <!--如果是数组 则递归调用这个组建-->
          <hp-nav-item v-if="article.length > 0" :item="article"></hp-nav-item>
          <!--不是数组 则输出文章名-->
          <li v-else class="g-navHref" v-on:click.right="showMenu">
            <router-link :to='"/ReadArticle/"+article.articleId'> {{ article.articleName }}</router-link>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hp-nav-item",
  props: {
    item:Array
  },
  data() {
    return {
      isShow: false,
      data:this.item
    };
  },
  mounted() {
  },
  methods: {
    /**
     * 点击后显示/关闭目录
     */
    showMsg(index, event) {
      var HpNavItemBody = event.target.nextElementSibling; // event.target为目标元素,获取紧接着的兄弟元素

      var flage = HpNavItemBody.attributes[0].nodeValue; // 获取自定义属性结点的值
      // 判断根据自定义属性结点的值判断是显示还是关闭
      if (flage == "false") {
        HpNavItemBody.style["height"] = "auto";
        HpNavItemBody.attributes[0].nodeValue = "true"; // 设置自定义属性结点的值
      } else {
        HpNavItemBody.style["height"] = "0";
        HpNavItemBody.attributes[0].nodeValue = "false"; // 设置自定义属性结点的值
      }
    },

    /**
     * 右击弹出菜单
     */
    showMenu(event) {
      event.preventDefault(); // 阻止默认行为
      // 创建菜单容器
      var menu = document.createElement("ul");
      menu.setAttribute("id", "HpNavItem_menu");
      menu.style["left"] = event.pageX - 10 + "px";
      menu.style["top"] = event.pageY - 10 + "px";
      // 设置离开菜单的时候菜单消失
      menu.addEventListener("mouseleave", function(event) {
        menu.parentNode.removeChild(menu);
      });

      var item_director = document.createElement("li"); // 创建目录
      item_director.addEventListener(
        "click",
        () => {
          this.$router.push("/Article");
        },
        false
      );
      item_director.setAttribute("class", " g-navHref");
      item_director.innerText = "创建目录";

      var item_artical = document.createElement("li"); // 创建文章
      item_artical.setAttribute("class", " g-navHref");
      item_artical.innerText = "创建文章";

      var item_manager = document.createElement("li"); // 编辑
      item_manager.setAttribute("class", " g-navHref");
      item_manager.innerText = "编辑";

      var item_delete = document.createElement("li"); // 删除
      item_delete.setAttribute("class", " g-navHref");
      item_delete.innerText = "删除";

      menu.appendChild(item_delete);
      menu.appendChild(item_manager);
      menu.appendChild(item_director);
      menu.appendChild(item_artical);
      document.body.appendChild(menu);
    },
    /**
     * 移动到此处时，给这个元素的className添加class
     */
    addClass(e) {
      var obj = e.target;
      var str = obj.className;
      if (!str.match(/g-navHref/)) {
        obj.className = str + " g-navHref";
      }
      console.log(obj.className);
    },
    /**
     * 离开到此处时，删除添加的元素
     */
    removeClass(e) {
      var obj = e.target;
      obj.className.replace(/g-navHref/g, "");
    }
  },
  watch:{
    item:{
      handler:function(){
        this.data = this.item;
      },
      deep:true
    }
  }
};
</script>
<style >
#HpNavItem {
  position: relative;
  width: 100%;
}
.HpNavItem-title {
  position: relative;
  height: 50px;
  line-height: 50px;
  background: white;
}

.HpNavItem-body {
  position: relative;
  height: 0;
  overflow: auto;
  transition: height 0.5s; /*设置当height出现变化时，出现移动效果 */
  padding-left: 10px;
}

.HpNavItem-body-show {
  height: auto;
}
.HpNavItem-item {
  /* text-indent: 20px;文字向右缩进20PX*/
  line-height: 50px;
  background: white;
}
/*全局样式*/
/*鼠标移动到导航时出现下划线已经字体变蓝*/
.navHref:hover {
  color: #2196f3;
  text-decoration: underline #2196f3 dotted;
  cursor: pointer;
  text-underline-position: under;
}
/*鼠标移动到导航时背景变为透明灰色+鼠标*/
.mouseMoveOnNav:hover {
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

/**定义右击菜单的样式 */
#HpNavItem_menu {
  background: white;
  position: absolute;
  width: 200px;
  left: 0;
  top: 0;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);
}
#HpNavItem_menu li {
  padding: 0;
  text-indent: 0;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #2196f3;
  text-align: center;
}
#HpNavItem_menu li:last-child {
  border-bottom: 0px;
}
#HpNavItem_menu li:hover {
  cursor: pointer;
  border: 1px solid #2196f3;
}
</style>