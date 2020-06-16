<template>
  <div id="Article" v-on:click.self="cancleEdit">
    <div class="Article-wrapper">
      <input
        class="input_wrapper"
        type="text"
        placeholder="请输入您的标题"
        v-model="articleName"
      />
      <div class="articleLocation_wrapper">
        <span>文章所属目录：</span>
        <div class="select_wrapper " id="select_hp">
          <select name="" id="" @change="getElement">
            <option index="-1">请选择</option>
            <option
              :value="JSON.stringify(value.smallItems)"
              v-for="(value, index) in directorys"
              :key="index"
              :index="index"
              >{{ value.title }}</option
            >
          </select>
        </div>
      </div>
      <HpEdit v-model="articleContent"></HpEdit>
      <div class="btn_wrapper">
        <button
          class="g_btn g_btn_larger g_btn_success"
          v-on:click="commitArticle"
        >
          上传
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import HpEdit from "@/components/other/HpEdit";

import {
  getDirectory,
  updateDirectory,
  putArticle
} from "@/network/Article.js";

export default {
  components: {
    HpEdit
  },
  data() {
    return {
      articleName: "",
      articleContent: "",
      directorys: Array
    };
  },
  created() {
    this.getDirectory();
  },
  beforeDestroy() {},
  methods: {
    /**
     * 退出
     */
    cancleEdit() {
      //this.$router.push("/");
      window.history.back();
    },
    /**
     * 上传文章
     */
    async commitArticle(e) {
      /**第一步 创建文章对象*/
      let articleName = this.articleName;
      if (articleName.trim() === "") {
        alert("请输入标题");
        return;
      }
      let articleId = this.createUID();
      let articleContent = this.articleContent; // 获取文章内容

      /**第二步 获取添加文章在目录中的位置*/
      let title; // 区域 例如 学习区
      let data; // 通过引用来获取要添加文章的目录位置，如果是新目录则添加。
      let selecttions = document.getElementById("select_hp").childNodes; // 获取所有选择框元素
      let zone; // 传递给服务器的区 例如 {title:'学习区',smaillitem:[]};
      let articleAuthor = localStorage.getItem('userName'); 
      // 如果第一个selection没有选择目录 则不允许提交
      if (selecttions[0].selectedIndex === 0) {
        alert("请选择目录");
        return;
      } else {
        title = selecttions[0].options[selecttions[0].selectedIndex].innerText;
        data = this.directorys[selecttions[0].selectedIndex - 1].smallItems;
        zone = this.directorys[selecttions[0].selectedIndex - 1];
      }
      // 判断接下来的selection 然后根据data上传数据
      for (let i = 1; i < selecttions.length; i++) {
        let option = selecttions[i].options[selecttions[i].selectedIndex]; // 获取选择的option
        let index = option.getAttribute("index");
        // 如果index == -1 说明option为“请选择”
        if (index === "-1") {
          continue;
        }
        // 如果index == -2 说明option为新创建的目录
        else if (index === "-2") {
          let _this = this;
          let directory = {
            title: option.innerText,
            titleId:_this.createUID(),
            smallItems: [
              []                            // 这里必须初始化一个[] 不然后面添加目录会报错，数据结构是这样设计的。
            ]
          };
          data = data[data.length - 1];
          data.push(directory);
          data = directory.smallItems;
        }
        // 如果不等于上面那两个，说明option为已存在的目录
        else {
          index = parseInt(index);
          data = data[data.length - 1][index].smallItems;
        }
      }

      /**第三步 将文章的部分信息赋值给目录*/
      data.unshift({ articleName, articleId }); // 在头部插入 也可以再其它地方插入 但是不能在尾部插入！。

      /**第四步 目录上传服务器 更新目录 */
      this.$store.commit("changeLoading");
      await updateDirectory("/Directory/updateDirectory", title, zone)
        .then(Response => {
          console.log("目录更新成功");
        })
        .catch(err => {
          console.log("目录更新失败");
          this.$store.commit("setLoadingSuccessFail");
          this.$store.commit("changeLoading");
          return;
        });

      /**第五步 文章上传服务器 添加文章 */
      await putArticle("/Article/add", articleId, articleName, articleContent,title,articleAuthor)
        .then(Response => {
          console.log("文章添加成功");
          this.$store.commit("setLoadingSuccessOk");
        })
        .catch(err => {
          console.log("文章添加失败");
          this.$store.commit("setLoadingSuccessFail");
        });
      this.$store.commit("changeLoading");
    },
    /**
     * 获取元素
     */
    getElement(e) {
      const option = e.target.options[e.target.selectedIndex];
      this.deleteSelection(option);
      const value = option.getAttribute("value");
      // 如果option的value值是create就创建一个对话框
      if (value === "create") {
        this.createDilog(e);
      }
      // 如果value有值就创建目录
      else if (value) {
        this.createSelection(value, option);
      }
      //this.createSelection(msg,option);
    },
    /**
     * msg 根据smg的数据来创建selection里面的option
     * documentObj 获取点击的document元素
     * 待选择第一个后，创建后面的selsection选项。
     */
    createSelection(msg, documentObj) {
      const parent = documentObj.parentNode.parentNode; // 获取创建的selection的容器
      const selectObj = document.createElement("select");
      const _this = this;
      selectObj.addEventListener("change", _this.getElement, false);

      // 创建“请选择”的option
      let option = document.createElement("option");
      option.innerHTML = "请选择";
      option.setAttribute("index", "-1");
      selectObj.appendChild(option);

      // 如果msg无法转换成对象，说明它没有子目录了。
      try {
        msg = JSON.parse(msg);
        // 选择性创建"子目录"的otion
        for (let obj of msg) {
          // 如果obj长度大于0说明是目录数组，则创建目录名单。
          if (obj.length > 0) {
            for (let index in obj) {
              const option = document.createElement("option");
              option.setAttribute(
                "value",
                JSON.stringify(obj[index].smallItems)
              );
              option.setAttribute("index", index); // index 代表目录下面的目录索引值
              option.innerHTML = obj[index].title;
              selectObj.appendChild(option);
            }
          }
        }
      } catch (error) {}

      // 创建"新建"的otion
      option = document.createElement("option");
      option.setAttribute("value", "create");
      option.innerText = "新建";
      selectObj.appendChild(option);

      // 将seleciton添加到容器里面
      parent.appendChild(selectObj);
    },
    /**
     * 删除后面的selection选项
     * */

    deleteSelection(documentObj) {
      const parent = documentObj.parentNode.parentNode;
      let nextDocObj = documentObj.parentNode.nextElementSibling;
      let deletArray = [];

      // 这里要把兄弟结点存储进来一个个删除 边删除 边获取兄弟结点 会报错
      while (nextDocObj) {
        deletArray.push(nextDocObj);
        nextDocObj = nextDocObj.nextElementSibling;
      }
      for (const iterator of deletArray) {
        parent.removeChild(iterator);
      }
    },
    /**
     * 创建输入对话框
     */
    createDilog(event) {
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
          document.body.removeChild(divObj);
          const option = event.target.options[event.target.selectedIndex]; // 这里获取点击“新建”的option元素对象
          const optionWrapper = event.target; // 获取option的容器 方便插入新的option

          //将对话框输入的文字插入到option容器里面的option中，并且创建新的selection方便再这个目录下面再次创建新的目录
          const newOption = document.createElement("option");
          newOption.setAttribute("value", input.value);
          newOption.setAttribute("index", "-2");
          newOption.innerText = input.value;
          optionWrapper.insertBefore(newOption, option);
          optionWrapper.selectedIndex--; // -1是为了让option的容器对准输入的文字
          this.getElement(event);
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
    /**
     * 创建文章
     */
    createArticle(name, id, content) {

    },
    /**
     * 根据时间生成唯一ID
     */
    createUID() {
      let date = new Date();
      let year = date.getFullYear();
      let mounth = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return "" + year + mounth + day + hours + minutes + seconds;
    },
    /**
     * 获取目录
     */
    async getDirectory(){
      this.$animation.createLoading();
      await getDirectory("/Directory/getAllDirectory")
        .then(Response => {
          this.directorys = Response.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.$animation.cancelLoading();
    },
  }
};
</script>
<style lang="less" scoped>
.editer-modle {
  background: white;
}
#Article {
  position: fixed;
  width: 100%;
  background: rgba(146, 146, 146, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .Article-wrapper {
    background: white;
    width: 80%;
    height: 700px;
    display: flex;
    flex-direction: column;
    .input_wrapper {
      height: 40px;
      text-indent: 10px;
      outline: none;
      border: 0;
      border-bottom: 1px solid black;
    }
    .articleLocation_wrapper {
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      justify-content: start;
    }
    .btn_wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
.test {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>