<template>
  <div class="mavonEditor">
    <mavon-editor v-model="content" :defaultOpen="defaultOpen" :subfield="subfield" :toolbarsFlag="toolbarsFlag" ref="markDown"></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Markdown",
  components: {
    mavonEditor
  },
  model: {
    prop: "articleContent",
    event: "change",
  },
  props: {
    articleContent: {
      type: String,
    },
    subfield:{
      type:Boolean,
      default:true
    },
    defaultOpen:{
      type:String,
      default:'preview'
    },
    toolbarsFlag:{
      type:Boolean,
      default:true
    },
  },
  data(){
    return {
      content:""
    }
  },
  computed:{},
  watch:{
    content:function (val, oldVal) {
      this.$emit("change",val);  
      this.$emit("success",{
        articleContent:val,
        articleHtml:this.$refs['markDown'].d_render,
        });  
    },
    articleContent(){
      this.content = this.articleContent;
    },
  },
  created(){
  },
  mounted(){
  },
  updated(){
  },
  beforeDestory(){
  },
  methods:{},
};
</script>
<style lang="less">
 .mavonEditor {
    
 }
</style>