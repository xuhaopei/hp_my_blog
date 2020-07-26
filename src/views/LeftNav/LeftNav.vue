<template>
  <div id="LeftNav">
    <LeftNavTop></LeftNavTop>
    <div class="LeftNavBody" v-on:click.right="showMenu">
      <HpNavItem
        :item="allItems"
        v-on:changeDirectoty="getAllDirectory"
      ></HpNavItem>
    </div>
  </div>
</template>
<script>
import LeftNavTop from "@/views/LeftNav/ChildrenCom/LeftNavTop.vue";
import HpNavItem from "@/components/other/HpNavItem.vue";

import { getDirectory,createDirector } from "@/network/LeftNav.js";

export default {
  name: "",
  data() {
    return {
      allItems: []
    };
  },
  components: {
    LeftNavTop,
    HpNavItem
  },
  created() {
    this.getAllDirectory();
  },
  methods: {
    async getAllDirectory(content) {
      await getDirectory("/Directory/getAllDirectory")
        .then(Response => {
          this.allItems = Array.from(Response.data);
        })
        .catch(err => {
          console.log(err);
        });
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

      // 创建目录
      var item_director = document.createElement("li");
      item_director.addEventListener(
        "click",
        () => {
          this.createDilog(event);
        },
        false
      );
      item_director.setAttribute("class", " g-navHref");
      item_director.innerText = "创建目录";

      menu.appendChild(item_director);
      document.body.appendChild(menu);
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
          let pid = 0;
          let path = '/0';
          let name = input.value.trim();
          createDirector("/Directory/createDirectory", pid, path, name)
            .then(Response => {
              console.log("创建成功嗷");
              this.$store.commit("changeDirctor"); // 因为是递归组件 所以更新目录只能通过vuex来通知顶级父组件
            })
            .catch(err => {
              console.log(err);
            });
          
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
    }
  },
  watch: {
    /**监听路由 */
    $route(to, from) {
      let toName = to.name;
      // 当跳转到'/'时
      if (toName === "AllArticle") {
        this.getAllDirectory();
      }
      let fromName = from.name;
      // 当从'/EditArticle'跳转时
      if (fromName === "EditArticle") {
        this.getAllDirectory();
      }
    },
    /**监听是否需要更新目录状态 */
    "$store.state.isChangeDirctor": function() {
      //document.location.reload();//重新加载当前页面
      this.getAllDirectory(content);
    }
  }
};
</script>
<style lang='less'>
#LeftNav {
  grid-area: LeftNav;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "LeftNavTop"
    "LeftNavBody";
  gap: 0;
}
#LeftNav .LeftNavBody {
  grid-area: LeftNavBody;
  padding: 8px 0;
  .createDirectory {
    height: 70%;
    width: 100%;
    background: white;
  }
}
</style>