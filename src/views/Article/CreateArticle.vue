<template>
  <div id="createArticle" v-on:click.self="cancleEdit">
    <div class="Article-wrapper">
      <input
        class="input_wrapper"
        type="text"
        placeholder="请输入您的标题~"
        v-model="articleName"
      />
      <input
      class="input_wrapper"
      type="text"
      placeholder="请输入标签，注意每个标签用英文逗号隔开~"
      v-model="articleTags"
      />
      <div class="articleLocation_wrapper">
        <span>文章所属目录：</span>
        <div class="select_wrapper " id="select_hp">
          <select name="" id="" @change="getElement">
            <option index="-1">请选择</option>
            <option
              :value="JSON.stringify(value.childrens)"
              v-for="(value, index) in directorys"
              :key="index"
              :index="index"
              :path ='value.path'
              :id ='value.id'
              >{{ value.name }}</option
            >
          </select>
        </div>
      </div>
      <div class='wangeEdit_wrapper'>
        <WangeEdit v-model="articleContent" v-on:getArticle='getMsgFromSon'></WangeEdit>
      </div>
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
import WangeEdit from "@/components/other/WangEditor";

import {
  getDirectory,
  updateDirectory,
  putArticle
} from "@/network/Article.js";

import { createDirector } from "@/network/LeftNav.js";

export default {
  components: {
    WangeEdit
  },
  data() {
    return {
      articleName: "",
      articleContent: '',
      articleContentText:'',
      directorys: Array,
      articleTags:''
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
      let articleContent = this.articleContent; // 获取文章HTML内容
      let articleContentText = this.articleContentText;

      /**第二步 获取目录的信息*/
      let selecttions = document.getElementById("select_hp").childNodes; // 获取所有选择框元素
      let arrays = [];
      for(let i = 0; i < selecttions.length; i++) {
        arrays.push([i,selecttions[i].selectedIndex]);
      }
      let temp = arrays.pop();
      try {
        while(temp[1]==0){
          temp = arrays.pop();
        }
      } catch (error) {
        alert('请选择目录');
        return;
      }
      let option = selecttions[temp[0]][temp[1]];     // 这是最终选择的option 从里面获取目录信息

      let pid = option.getAttribute('id');
      let path = option.getAttribute('path');
      let author = localStorage.getItem('userName'); 
      let tags = this.articleTags;
      let articleId;
      /**第三步 文章上传服务器 添加文章 */
      await putArticle("/Article/add", pid,articleName,articleContent,'author',tags,articleContentText)
        .then(Response => {
          //console.log("文章添加成功");
          articleId = Response.data.insertId;
          return createDirector('/Directory/createDirectory',[pid,path,articleName,articleId]);
        })
        .then((Response)=>{
          //console.log("文章添加到目录成功~");
          this.$store.commit('changeDirctor'); 
          this.$router.push('/ReadArticle/'+articleId);
          
        })
        .catch(err => {
          //console.log("文章添加失败");
        });
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
     * 待选择第一个后，如果有子目录(msg[msg.length-1].length>0)，则创建后面的selection选项。
     */
    createSelection(msg, documentObj) {

      // 如果有子目录则创建 否则返回
      msg = JSON.parse(msg);
      if(msg[msg.length-1].length === 0) return;

      const parent = documentObj.parentNode.parentNode; // 获取创建的selection的容器
      const selectObj = document.createElement("select");
      const _this = this;
      selectObj.addEventListener("change", _this.getElement, false);

      // 创建“请选择”的option
      let option = document.createElement("option");
      option.innerHTML = "请选择";
      option.setAttribute("index", "-1");
      selectObj.appendChild(option);

      try {
        
        // 选择性创建"子目录"的otion
        for (let obj of msg) {
          // 如果obj长度大于0说明是目录数组，则创建目录名单。
          if (obj.length > 0) {
            for (let index in obj) {
              const option = document.createElement("option");
              option.setAttribute(
                "value",
                JSON.stringify(obj[index].childrens)
              );
              option.setAttribute("index", index); // index 代表目录下面的目录索引值
              option.setAttribute("path", obj[index].path); 
              option.setAttribute("id", obj[index].id); 
              option.innerHTML = obj[index].name;
              selectObj.appendChild(option);
            }
          }
        }
      } catch (error) {}

      // 创建"新建"的otion
      option = document.createElement("option");
      option.setAttribute("value", "create");
      option.innerText = "新建";
      //selectObj.appendChild(option); //暂时关闭新建这个功能

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
      await getDirectory("/Directory/getAllDirectory")
        .then(Response => {
          this.directorys = Response.data;
        })
        .catch(err => {
          //console.log(err);
        });
    },
    /**
     * 获取子组件传递过来的信息
     */
    getMsgFromSon(msg){
        this.articleContent = msg.articleContent;
        this.articleContentText = msg.articleContentText;
    }
  }
};
</script>
<style lang="less" >
.editer-modle {
  background: white;
}
#createArticle {
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(146, 146, 146, 0.3);
  .Article-wrapper {
    box-sizing: border-box;
    position: relative;
    width: 80%;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 10px rgb(146, 146, 144);
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    .input_wrapper {
      display: block;
      padding: 10px;
      outline: none;
      border: 0;
      border-bottom:1px solid rgba(146,146,146,0.8);
      height: 18px;
    }
    .articleLocation_wrapper {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      justify-content: start;
       border-bottom:1px solid rgba(146,146,146,0.8);
    }
    .wangeEdit_wrapper {
      flex:1;
      min-height: 300px;
    }
    .article_tags{
      width: 100%;
    }
    .btn_wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      height: 50px;
    }
  }
}
</style>