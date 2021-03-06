<template>
  <div id="editArticle" >
    <div class="Article-wrapper">
      <!-- 输入标题 -->
      <!-- <input class="input_wrapper" type="text" placeholder="请输入您的标题"   v-model="articleName"/> -->
      <el-input placeholder="请输入标题" v-model="articleName">
        <template slot="prepend">文章标题 </template>
      </el-input>
      <!-- 输入标签 -->
      <!-- <input
      class="input_wrapper"
      type="text"
      placeholder="请输入标签，注意每个标签用英文逗号隔开~"
      v-model="articleTags"
      /> -->
      <el-input placeholder="请输入标签，注意每个标签用英文逗号隔开" v-model="articleTags">
        <template slot="prepend">文章标签</template>
      </el-input>
      <!-- 富文本内容 -->
      <div class='wangeEdit_wrapper'>
          <!-- <WangeEdit v-model='articleContent' v-on:getArticle='getMsgFromSon'></WangeEdit> --> 
          <mark-down></mark-down>
      </div>
      <!-- 退出 保存 上传 -->
      <div class="btn_wrapper">
        <!-- <button
          class="g_btn g_btn_larger g_btn_success"
          v-on:click="saveArticle"
        >
          保存
        </button>
        <button
          class="g_btn g_btn_larger g_btn_success"
          v-on:click="commitArticle"
        >
          上传
        </button> -->
        <el-button-group>
          <el-button type="primary" icon="el-icon-circle-close" @click="cancleEdit">退出</el-button>
          <el-button type="primary" icon="el-icon-circle-check" @click="saveArticle">保存</el-button>
          <el-button type="primary" icon="el-icon-upload2" @click="commitArticle">上传</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>
<script>


import WangeEdit from "@/components/other/WangEditor";
import MarkDown from "@/components/other/MarkDown"

import {getDirectory,updateDirectory,putArticle,getArticle,updateArticle} from '@/network/Article.js';



export default {
  components: {
    WangeEdit,
    "mark-down":MarkDown
  },
  data() {
    return {
        articleName:"",        
        articleContent:'',
        articleContentText:'',
        id:"",
        articleTags:"",        // 文章所属区域 比如学习区
        directorys:[],        
    };
  },
  created(){
      this.getArticle(this.$route.params.Id);
      this.getDirectory();
  },
  mounted(){
    
  },
  beforeDestroy() {},
  methods: {
    /**
     * 退出
     */
    cancleEdit() {
      //this.$router.push('/')
      window.history.back();
    },
    /**
     * 保存文章
     */
    async saveArticle(e) {

      /**第一步 创建文章对象*/
      let articleName = this.articleName;
      if(articleName.trim() === '') {
        alert('请输入标题');
        return;
      }
      let id = this.id;
      let articleContent = this.articleContent; // 获取文章内容
      let tags = this.articleTags;
      let articleContentText = this.articleContentText;

      /**第五步 文章上传服务器 更新文章 */
      await updateArticle('/Article/update',id,articleName,articleContent,tags,articleContentText).then((Response)=>{
        //console.log('文章更新成功');
      }).catch((err)=>{
        //console.log('文章更新失败',err);
      }) 

    },
    /**
     * 上传文章
     */
    async commitArticle(e) {

      /**第一步 创建文章对象*/
      let articleName = this.articleName;
      if(articleName.trim() === '') {
        alert('请输入标题');
        return;
      }
      let id = this.id;
      let articleContent = this.articleContent; // 获取文章内容
      let tags = this.articleTags;
      let articleContentText = this.articleContentText;

      /**第五步 文章上传服务器 更新文章 */
      await updateArticle('/Article/update',id,articleName,articleContent,tags,articleContentText).then((Response)=>{
        //console.log('文章更新成功');
        window.history.back();
      }).catch((err)=>{
        //console.log('文章更新失败',err);
      }) 

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
      option.setAttribute('index','-1');
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
              option.setAttribute("value", JSON.stringify(obj[index].smallItems));
              option.setAttribute("index", index);              // index 代表目录下面的目录索引值
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
          newOption.setAttribute("index", '-2');
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
     * 获取文章
     */
    async getArticle(id) {
      await getArticle("/Article/find", id)
        .then(Response => {
          this.articleName = Response.data.articleName;
          this.articleContent = Response.data.articleContent;
          this.id = Response.data.id;
          this.articleTags = Response.data.tags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 获取目录
     */
    async getDirectory(){
        await getDirectory('/Directory/getAllDirectory').then((Response)=>{
          
          this.directorys = Response.data;

        }).catch((err)=>{
          console.log(err)
        })
    },
    /**
     * 根据时间生成唯一ID
     */
    createUID(){
      let date = new Date();
      let year = date.getFullYear();
      let mounth = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return ""+year+mounth+day+hours+minutes+seconds;
    },
    /**
     * 根据id修改目录中文章对应的articleName
     */
    findPlace(directorys,id,articleName) {
      for (const iterator of directorys) {
         let zone = iterator.smallItems;
          for (const iterator1 of zone) {
             if(Array.isArray(iterator1)) {
                this.findPlace(iterator1,id,articleName);
             }
             else {
                if(iterator1.id === id) {
                  iterator1.articleName = articleName;
                }
             }
          }
      }
    },
    /**
     * 获取子组件传递过来的信息
     */
    getMsgFromSon(msg){
        this.articleContent = msg.articleContent;
        this.articleContentText = msg.articleContentText;
    }
  },
};
</script>
<style lang="less" scoped>
.editer-modle {
  background: white;
}
#editArticle {
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  background: rgba(146, 146, 146, 0.3);

  .Article-wrapper {
    box-sizing: border-box;
    position: relative;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 10px rgb(146, 146, 144);
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    .input_wrapper {
      display: block;
      box-sizing: border-box;
      flex:none;
      height: 40px;
      padding: 10px;
      outline: none;
      border: 0;
      border-bottom:1px solid rgba(146,146,146,0.8);
    }
    .wangeEdit_wrapper {
      flex:1;
      min-height: 200px;
      overflow: scroll;
    }
    .btn_wrapper {
      box-sizing: border-box;
      flex:none;
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>