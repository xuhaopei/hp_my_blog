<template>
  <div class="mavonEditor">
    <mavon-editor></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "Markdown",
  components: {
    mavonEditor
  }
};
</script>
<style lang="less">
 .mavonEditor {
    
 }
</style>