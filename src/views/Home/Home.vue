<template>
  <div class="home">
    <el-container>
      <!-- 头导航 -->
      <el-header style="padding:0">
        <top-nav-by-ele></top-nav-by-ele>
      </el-header>
      <!-- 主体内容 -->
      <transition name="slide-fade">
        <router-view />
      </transition>
    </el-container>
    
  </div>
</template>

<script>

import TopNavByEle from "@/views/TopNav/TopNavByEle.vue";
import {setHeaderToken} from '@/network/Token.js';

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
    let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null;
    setHeaderToken(localStorage.getItem("token"))
    this.$store.commit('setUser',user);
  },
  methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
