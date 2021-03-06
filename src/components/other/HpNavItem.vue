<!--这是导航模块-->
<template>
  <div id="HpNavItem">
    <!--zone代表每个学习区-->
    <div v-for="(zone, index) in data" :key="index">
      <div
        class="HpNavItem-name   g_layout_flex_justify-content_space-between g-navHref"
        v-on:click="showMsg(index, $event)"
        v-on:click.right.stop="showMenu"
        :pid="zone.pid"
        :id="zone.id"
        :path="zone.path"
        style="text-indent:10px;"
      >
      {{ zone.name }}
        <i class="iconfont icon-wenjianjia" ></i>
      </div>
      <div class="HpNavItem-body" flage="false">
        <!--article代表文章信息，如果article的长度大于0说明是区，则递归调用此组件-->
        <div
          class="HpNavItem-item "
          v-for="(article, index) in zone.childrens"
          :key="index"
        >
          <!--如果是数组 则递归调用这个组建-->
          <hp-nav-item v-if="article.length > 0" :item="article"></hp-nav-item>
          <!--不是数组 则输出文章名-->
          <li v-else class="g-navHref" :title='article.name'
          style="
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;"
            >
            <router-link :to="'/ReadArticle/' + article.articleId" >
              {{ article.name }}</router-link
            >
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {MessageBox} from 'element-ui';

export default {
  name: "hp-nav-item",
  props: {
    item:{
      type:Array,
      default:function(){
        return [
              {
                id: 347,
                pid: 0,
                name: "HTML",
                path: "/0/347",
                childrens: [{
                        id: 361,
                        pid: 347,
                        path: "/0/347/361",
                        name: "img中alt和title的区别",
                        articleId: 246
                    }, {
                        id: 349,
                        pid: 347,
                        path: "/0/347/349",
                        name: "HTML文档结构（重点是meta）",
                        articleId: 234
                    }, {
                        id: 348,
                        pid: 347,
                        path: "/0/347/348",
                        name: "HTML语义化",
                        "articleId": 233
                    },
                    []
                ]
            }
        ]
      }
    }
  },
  data() {
    return {
      isShow: false,
      data: this.item
    };
  },
  mounted() {},
  methods: {
    /**
     * 点击后显示/关闭目录
     */
    showMsg(index, event) {
      var HpNavItemBody = event.target.nextElementSibling; // event.target为目标元素,获取紧接着的兄弟元素 即是子文件

      var flage = HpNavItemBody.attributes[0].nodeValue; // 获取自定义属性结点的值
      var i = event.target.getElementsByTagName('i')[0]; // 获取文件夹图标
      // 判断根据自定义属性结点的值判断子文件是显示还是关闭
      if (flage == "false") {
        HpNavItemBody.style["height"] = "auto";
        HpNavItemBody.attributes[0].nodeValue = "true"; // 设置自定义属性结点的值
        i.className = 'iconfont icon-folder';

      } else {
        HpNavItemBody.style["height"] = "0";
        HpNavItemBody.attributes[0].nodeValue = "false"; // 设置自定义属性结点的值
        i.className = 'iconfont icon-wenjianjia';
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

      // 创建子目录
      var item_directorSon = document.createElement("li");
      item_directorSon.addEventListener(
        "click",
        () => {
          this.createDilog(event);
        },
        false
      );
      item_directorSon.setAttribute("class", " g-navHref");
      item_directorSon.innerText = "创建子目录";

      // 编辑目录
      var item_manager = document.createElement("li"); 
      item_manager.addEventListener(
        "click",
        () => {
          this.createDilog(event,event.target.innerText);
        },
        false
      );
      item_manager.setAttribute("class", " g-navHref");
      item_manager.innerText = "编辑目录";

      // 删除目录
      var item_delete = document.createElement("li"); 
      item_delete.addEventListener(
        "click",
        (e) => {
          MessageBox.confirm(`此操作将永久删 <strong style='color:red;padding:0 10px'>${event.target.innerText} (目录)</strong>, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            dangerouslyUseHTMLString:true
          }).then(() => {
            let playload = {
              url:'/Directory/deleteDirectory',
              parmas:[event.target.getAttribute('id')]
            }
            this.$store.dispatch('deleteDirector',playload).then((msg)=>{
              let temp_playload = {
                url:'/Directory/getAllDirectory'
              }
              this.$store.dispatch('getDirector',temp_playload);
            });
          }).catch(() => {

          });
          
        },
        false
      );
      item_delete.setAttribute("class", " g-navHref");
      item_delete.innerText = "删除目录";

      menu.appendChild(item_delete);
      menu.appendChild(item_manager);
      menu.appendChild(item_directorSon);
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
    },
    /**
     * 离开到此处时，删除添加的元素
     */
    removeClass(e) {
      var obj = e.target;
      obj.className.replace(/g-navHref/g, "");
    },
    /**
     * 创建输入对话框
     */
    createDilog(event, value = "") {
      // 去除已经存在的对话框 避免重复创建对话框
      var hpDialog = document.getElementById("hpDialog");
      hpDialog && document.body.removeChild(hpDialog);

      // 定义对话框的容器
      const divObj = document.createElement("div");
      divObj.setAttribute(
        "style",
        `
        position: fixed;
        background: white;
        box-shadow: 0px 0px 10px 10px rgba(146, 146, 146);
        top:calc(50% - 100px);
        left:calc(50% - 200px);
        width:400px;
        height:200px;
        display: flex;
        padding: 15px;
        flex-direction: column;
        justify-content: space-around;
        z-index:999999;
      `
      );
      divObj.setAttribute("id", "hpDialog");

      //定义输入框
      const input = document.createElement("input");
      input.setAttribute("placeholder", "请输入目录名称");
      input.setAttribute("class", "g_input");
      input.value = value;
      divObj.appendChild(input);

      //定义按钮容器
      const btnGroup = document.createElement("div");
      btnGroup.setAttribute(
        "style",
        `
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        `
      );

      //定义确认按钮
      const buttonDo = document.createElement("button");
      buttonDo.setAttribute("class", "g_btn g_btn_larger g_btn_success");
      buttonDo.innerText = "确认";
      buttonDo.addEventListener(
        "click",
        () => {
          if (input.value.trim() === "") {
            alert("请输入文字!");
            return;
          }
          document.body.removeChild(divObj); // 关闭对话框

          let directorItem = event.target;
          let id = parseInt(directorItem.getAttribute("id"));
          let path = directorItem.getAttribute("path");
          let name = input.value.trim();

          // 如果value不为空，说明是编辑目录
          if (value != "") {
            let playload = {
              url:'/Directory/updateDirectory',
              parmas:[id, path, name, 0]
            }
            this.$store.dispatch('updateDirector',playload).then((msg)=>{
              let temp_playload = {
                url:'/Directory/getAllDirectory'
              }
              this.$store.dispatch('getDirector',temp_playload);
            });
          } 
          // 如果value为空，说明是新增目录
          else {
            let playload = {
              url:'/Directory/createDirectory',
              parmas:[id, path, name, 0]
            }
            this.$store.dispatch('addDirector',playload).then((msg)=>{
               let temp_playload = {
                url:'/Directory/getAllDirectory'
              }
              this.$store.dispatch('getDirector',temp_playload);
            });
          }
          
        },
        false
      );

      //定义取消按钮
      const buttonCancle = document.createElement("button");
      buttonCancle.setAttribute("class", "g_btn g_btn_larger g_btn_cancle");
      buttonCancle.innerText = "取消";
      buttonCancle.addEventListener(
        "click",
        () => {
          document.body.removeChild(divObj);
          event.target.selectedIndex = 0;
        },
        false
      );
      btnGroup.appendChild(buttonDo);
      btnGroup.appendChild(buttonCancle);

      divObj.appendChild(btnGroup);

      document.body.appendChild(divObj);
    },
  },
  watch: {
    item: {
      handler: function() {
        this.data = this.item;
      },
      deep: true
    }
  }
};
</script>
<style >
#HpNavItem {
  position: relative;
  width: 100%;
}
.HpNavItem-name {
  position: relative;
  height: 50px;
  line-height: 50px;
  background: white;
  font-weight: bolder;
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
  text-decoration: rgb(236, 240,9);
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