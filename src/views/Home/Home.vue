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
import {validateLogin} from "@/utils/Validate";
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
    if(validateLogin() === false) this.$router.push("/");
  },
  methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
  }
}
</script>
