<template>
  <div id="app">
    <TopNav></TopNav>
    <LeftNav :itme="directorys"></LeftNav>
    <Animation :loading="$store.state.loading" size="3"></Animation>
    <router-view />
  </div>
</template>


<script>
import LeftNav from "@/views/LeftNav/LeftNav.vue";
import TopNav from "@/views/TopNav/TopNav.vue";
import Animation from "@/components/other/AnimationTick.vue";


export default {
  data() {
    return {
      directorys: Object
    };
  },
  components: {
    LeftNav,
    TopNav,
    Animation
  },
  methods: {
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


      var item_manager = document.createElement("li"); // 编辑
      item_manager.addEventListener(
        "click",
        () => {
          console.log(event.target.childNodes[0].baseURI);
          this.$router.push("/EditArticle");
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
      menu.appendChild(item_director);
      document.body.appendChild(menu);
    },
  },
};
</script>

<style>
@import url(assets/css/base.css);

#app {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 255px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "LeftNav TopNav"
    "LeftNav Home";
  gap: 0;
}
</style>
