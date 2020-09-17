<template>
  <div id="LeftNav">
    <div class="LeftNavBody" v-on:click.right="showMenu">
      <HpNavItem
        :item="this.allItems"
        v-on:changeDirectoty="getAllDirectory"
      ></HpNavItem>
    </div>
  </div>
</template>
<script>

//import LeftNavTop from "@/views/LeftNav/ChildrenCom/LeftNavTop.vue";
import HpNavItem from "@/components/other/HpNavItem.vue";

export default {
  name: "",
  data() {
    return {
      allItems: []
    };
  },
  components: {
    HpNavItem
  },
  created() {
    this.getAllDirectory();
  },
  methods: {
    getAllDirectory(content) {
        let playload = {
          url:'/Directory/getAllDirectory'
        }
        this.$store.dispatch('getDirector',playload);
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
          let playload = {
            url:'/Directory/createDirectory',
            parmas:[pid, path, name, 0]
          }
          this.$store.dispatch('addDirector',playload).then((msg)=>{
            this.getAllDirectory();
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
    },
    /**通过vue-x来管理文章与目录，减少了http请求,如果directors更新，则请求数据 */
    "$store.state.article.directors":function(){
       this.allItems = this.$store.getters.getDirector;
    }
  }
};
</script>
<style lang='less'>
#LeftNav {
  border-radius: 5px;
  box-shadow: 0px 0px 5px 5px rgb(144, 146, 146);
  flex:none;
  margin:10px 0px 10px 3px;

}
#LeftNav .LeftNavBody {
  padding: 8px 4px;
  width: 250px;
  box-sizing: border-box;
  .createDirectory {
    height: 70%;
    width: 100%;
    background: white;
  }
}
</style>