<template>
  <div class="home">
    <el-container>
      <!-- 头导航 -->
      <el-header style="padding:0">
        <top-nav-by-ele></top-nav-by-ele>
      </el-header>
      <!-- 主体内容 -->
      <router-view />
    </el-container>
    
  </div>
</template>

<script>

import TopNavByEle from "@/views/TopNav/TopNavByEle.vue";

export default {
  name: 'Home',
  components: {
    'top-nav-by-ele':TopNavByEle,
  },
  data(){
    return {
    }
  },
  created(){
  },
  methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
