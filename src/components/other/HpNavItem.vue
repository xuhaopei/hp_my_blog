<!--这是导航模块-->
<template>
  <div id="HpNavItem">
    <!--zone代表每个学习区-->
    <div v-for="(zone, index) in data" :key="index">
      
      <div
        class="HpNavItem-name   g_layout_flex_justify-content_space-between g-navHref"
        v-on:click="showMsg(index, $event)"
        v-on:click.right.prevent="showMenu($event)"
        :pid="zone.pid"
        :id="zone.id"
        :path="zone.path"
        style="text-indent:10px;"
      >
        {{ zone.name }}
        <i class="iconfont icon-wenjianjia"></i>
      </div>
      <div class="HpNavItem-body" flage="false">
        <!--article代表文章信息，如果article的长度大于0说明是区，则递归调用此组件-->
        <div
          class="HpNavItem-item "
          v-for="(article, index) in zone.childrens"
          :key="index"
        >
          <!--如果是数组 则递归调用这个组建-->
          <hp-nav-item v-if="article.length > 0" :data="article"></hp-nav-item>
          <!--不是数组 则输出文章名-->
          <li
            v-else
            class="g-navHref"
            :title="article.name"
            style="
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;"
          >
            <router-link :to="'/Home/ReadArticle/' + article.articleId">
              {{ article.name }}</router-link
            >
          </li>
        </div>
      </div>
    </div>

    <menu-item :visible.sync="visible" :event="event">
      <a @click="addHandle(event)">创建子目录</a>
      <a @click="updateHandle(event)">编辑目录</a>
      <a @click="deleteHandle(event)"> 删除目录</a>
    </menu-item>
  </div>
</template>
<script>
import MenuItem from "@/components/other/MenuItem.vue";
import { MessageBox } from "element-ui";
import {
  httpCreateDirector,
  httpDeleteDirector,
  httpUpdateDirectory,
  httpGetDirectory,
} from "@/network/Directory.js";

export default {
  name: "hp-nav-item",
  components: {
    MenuItem,
  },
  props: {
    data: {
      type: Array,
      default: function() {
        return [
          {
            id: 347,
            pid: 0,
            name: "HTML",
            path: "/0/347",
            childrens: [
              {
                id: 361,
                pid: 347,
                path: "/0/347/361",
                name: "img中alt和title的区别",
                articleId: 246,
              },
              {
                id: 349,
                pid: 347,
                path: "/0/347/349",
                name: "HTML文档结构（重点是meta）",
                articleId: 234,
              },
              {
                id: 348,
                pid: 347,
                path: "/0/347/348",
                name: "HTML语义化",
                articleId: 233,
              },
              [],
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
      isShow: false,
      visible: false,
      event: new PointerEvent(""),
    };
  },
  mounted() {
  },
  methods: {
    /**
     * 点击后显示/关闭目录
     */
    showMsg(index, event) {
      var HpNavItemBody = event.target.nextElementSibling; // event.target为目标元素,获取紧接着的兄弟元素 即是子文件

      var flage = HpNavItemBody.attributes[0].nodeValue; // 获取自定义属性结点的值
      var i = event.target.getElementsByTagName("i")[0]; // 获取文件夹图标
      // 判断根据自定义属性结点的值判断子文件是显示还是关闭
      if (flage == "false") {
        HpNavItemBody.style["height"] = "auto";
        HpNavItemBody.attributes[0].nodeValue = "true"; // 设置自定义属性结点的值
        i.className = "iconfont icon-folder";
      } else {
        HpNavItemBody.style["height"] = "0";
        HpNavItemBody.attributes[0].nodeValue = "false"; // 设置自定义属性结点的值
        i.className = "iconfont icon-wenjianjia";
      }
    },


    /**
     * 右击弹出菜单
     */
    showMenu(event) {
      this.event = event;
      this.visible = true;
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
    addHandle(event) {
      this.$prompt("请输入目录名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(\w|\W)+$/,
        inputErrorMessage: "请输入目录名称",
      })
        .then(({ value }) => {
          let directorItem = event.target;
          let pid = parseInt(directorItem.getAttribute("id"));
          let path = directorItem.getAttribute("path");
          let name = value;
          let articleId = 0;
          let uid = this.$store.state.people.user.id;
          httpCreateDirector(pid, path, value, 0, uid).then(() => {
            this.$emit("success")
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    deleteHandle(event) {
      MessageBox.confirm(
        `此操作将永久删 <strong style='color:red;padding:0 10px'>${event.target.innerText} (目录)</strong>, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      )
        .then(() => {
          httpDeleteDirector({id:event.target.getAttribute("id")}).then(()=>{
            this.$emit("success")
          });
        })
        .catch(() => {});
    },
    updateHandle(event) {
      this.$prompt("请输入目录名称", "修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^(\w|\W)+$/,
        inputErrorMessage: "请输入目录名称",
        inputValue: event.target.innerText,
      })
        .then(({ value }) => {
          let directorItem = event.target;
          let id = parseInt(directorItem.getAttribute("id"));
          let path = directorItem.getAttribute("path");
          
          httpUpdateDirectory(id, path, value).then((value)=>{
            this.$emit("success")
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  watch: {
    item: {
      handler: function() {
        this.data = this.item;
      },
      deep: true,
    },
  },
};
</script>
<style>
#HpNavItem {
  position: relative;
  width: 100%;
}
.HpNavItem-title {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
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
  text-decoration: rgb(236, 240, 9);
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
