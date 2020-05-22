<template>
  <div id="Article" v-on:click.self="cancleEdit" >
    <div class="Article-wrapper" >
        <HpEdit></HpEdit>
    </div>
  </div>
</template>
<script>

import HpEdit from "@/components/other/HpEdit";

export default {
  components: {
    HpEdit
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    /**
     * 退出
     */
    cancleEdit(){
      window.history.back();
    }
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
}
</style>