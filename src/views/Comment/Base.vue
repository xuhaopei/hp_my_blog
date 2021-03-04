<template>
  <div class="Comment">
      
      <show-com></show-com>
  </div>
</template>

<script>

import ShowCom from "@/views/Comment/ShowCom.vue";

export default {
name:'Comment',
components:{
    'show-com':ShowCom
},
model:{},
props:{},
data(){
return {
}
},
computed:{},
watch:{},
created(){
},
mounted(){},
beforeDestory(){},
methods:{},
}
</script>

<style>

</style>