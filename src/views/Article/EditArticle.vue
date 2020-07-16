<template>
  <div id="Article" v-on:click.self="cancleEdit">
    <div class="Article-wrapper">
      <input class="input_wrapper" type="text" placeholder="请输入您的标题"   v-model="articleName"/>
      <input
      class="input_wrapper"
      type="text"
      placeholder="请输入标签，注意每个标签用英文逗号隔开~"
      v-model="articleTags"
      />
      <WangeEdit v-model='articleContent' v-on:getArticle='getMsgFromSon'></WangeEdit>

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


import WangeEdit from "@/components/other/WangEditor";

import {getDirectory,updateDirectory,putArticle,getArticle,updateArticle} from '@/network/Article.js';



export default {
  components: {
    WangeEdit
  },
  data() {
    return {
        articleName:String,        
        articleContent:'',
        articleContentText:'',
        id:String,
        articleTags:String,        // 文章所属区域 比如学习区
        directorys:Array,        
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
      this.$animation.createLoading();
      await updateArticle('/Article/update',id,articleName,articleContent,tags,articleContentText).then((Response)=>{
        console.log('文章更新成功');
        window.history.back();
      }).catch((err)=>{
        console.log('文章更新失败',err);
      }) 
      this.$animation.cancelLoading();

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
      this.$animation.createLoading();
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
      this.$animation.cancelLoading();
    },
    /**
     * 获取目录
     */
    async getDirectory(){
        this.$animation.createLoading();
        await getDirectory('/Directory/getAllDirectory').then((Response)=>{
          
          this.directorys = Response.data;

        }).catch((err)=>{
          console.log(err)
        })
        this.$animation.cancelLoading();
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
    height: 660px;
    display: flex;
    flex-direction: column;
    .input_wrapper {
      display: block;
      padding: 10px;
      outline: none;
      border: 0;
       border-bottom:1px solid rgba(146,146,146,0.8);
    }
    .articleLocation_wrapper {
      display: block;
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