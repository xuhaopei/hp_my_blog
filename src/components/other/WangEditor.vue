<template>
  <div id="wangeEdit">
    <div id="wangeEditToolBar" class="toolbar"></div>
    <div id="wangeEditWrapper" v-on:mouseout="putEditContent" style=""></div>
  </div>
</template>
<script>
import E from "wangeditor";

export default {
  model: {
    prop: "content",
    event: "change",
  },
  props: {
    content: {
      type: String,
    },
  },
  name: "wangeEdit",
  data() {
    return {
      newContent: this.content,
      editor: Object,
    };
  },
  watch: {
    content: function (val, oldVal) {
      this.newContent = val;
      //document.getElementById('HpEdit_editContent').innerHTML = val;
      this.setEditHTMLContent(val);
    },
  },
  mounted() {
    this.createEdit();
    this.dynamicHeight();
  },
  destroyed() {
    window.removeEventListener('resize',this.changeHeight);
  },
  methods: {
    createEdit() {
      this.editor = new E("#wangeEditToolBar", "#wangeEditWrapper");
      this.editor.customConfig.menus = [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "video", // 插入视频
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ];
      this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      this.editor.customConfig.pasteFilterStyle = false;
      this.editor.customConfig.uploadImgServer = "/uploadImage"; // 上传图片到服务器
      this.editor.customConfig.linkImgCallback = function (url) {
      };
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          //xhr.open('POST', 'http://localhost:3000/uploadImage', true);
          //console.log(files,'图片')
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr, editor, result) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          xhr.open("GET", result.data[0], true);
          //alert('上传成功！');
        },
        fail: function (xhr, editor, result) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
          alert("上传失败！");
        },
        error: function (xhr, editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          alert("上传错误！");
        },
        timeout: function (xhr, editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
          alert("上传超时！");
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        /*customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    //let url = result.data[0].substring(result.data[0].indexOf('/'));
                    let url = result.data[0];
                   // console.log(url);
                    insertImg(url);
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }*/
      };
      this.editor.create();
    },
    getEditHTMLContent() {
      return this.editor.txt.html();
    },
    getEditTXTContent() {
      return this.editor.txt.text();
    },
    setEditHTMLContent(val) {
      this.editor.txt.html(val);
    },
    /**
     * 将数据传给父组件
     */
    putEditContent() {
      let articleContent = this.getEditHTMLContent();
      let articleContentText = this.getEditTXTContent();
      this.$emit("change", articleContent); // 父组件用v-modle来接收 所以事件要用input
      this.$emit("getArticle", { articleContent, articleContentText });
    },
    /**
     * 通过监听resize动态修改wangeEditWrapper高度，保证动态响应。CSS搞不了，不知道为什么哦
     */
    dynamicHeight() {
      this.changeHeight();
      window.addEventListener("resize", this.changeHeight);
    },
    /**
     * 
     */
    changeHeight(){
      if(document.getElementById("wangeEdit").parentNode == null) return;
      let parent = document.getElementById("wangeEdit").parentNode;
      let wangeEditWrapper = document.getElementById("wangeEditWrapper");
      wangeEditWrapper.style.height = parent.clientHeight - 30 + "px";
    },
  },
};
</script>
<style  lang='less'>
#wangeEdit {
  .toolbar {
    border-bottom: 1px solid rgba(146, 146, 146, 0.8);
  }
  #wangeEditWrapper {
    overflow: auto;

    border-bottom: 1px solid rgba(146, 146, 146, 0.8);
  }
}
</style>