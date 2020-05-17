<template>
  <div id="Article" >
    <div class="editer-modle">
      <quillEditor
        v-model="content"
        ref="myQuillEditor"
        @focus="onEditorFocus($event)"
        @blur="onEditorBlur($event)"
        @change="onEditorChange($event)"
        aria-placeholder="placeholder"
      >
      </quillEditor>
    </div>
    <div class="Article-wrapper">
        <HpEdit></HpEdit>
    </div>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import HpEdit from "@/components/other/HpEdit";
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; // 富文本基于quill

export default {
  components: {
    quillEditor,
    HpEdit
  },
  data() {
    return {
      editor: null, // 富文本编辑器对象
      content: `<p></p><p><br></p><ol></ol>`, // 富文本编辑器默认内容
      editorOption: {
        //  富文本编辑器配置
        modules: {
          toolbar: "#toolbar"
        },
        theme: "snow",
        placeholder: "请输入正文"
      }
    };
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {
        console.log(this.content)
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {}
  }
};
</script>
<style>
.editer-modle{
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
}
.Article-wrapper {
  background: white;
  width: 80%;
  height: 700px;
  box-shadow: 0px 0px 10px 10px black;
}
</style>