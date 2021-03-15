<template>
  <div class="mavonEditor">
    <mavon-editor v-model="content"></mavon-editor>
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
  },
  data(){
    return {
      content:this.articleContent
    }
  },
  computed:{},
  watch:{
    content:function (val, oldVal) {
      this.$emit("change",val);  
    },
  },
  created(){
  },
  mounted(){},
  beforeDestory(){
  },
  methods:{},
};
</script>
<style lang="less">
 .mavonEditor {
    
 }
</style>