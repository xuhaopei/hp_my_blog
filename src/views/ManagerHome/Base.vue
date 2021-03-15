<template>
  <div class="managerHome" style="height:100%">
    <el-container style="height:100%">
        <el-aside width="250px" style="height:100%">
          <left-menu style="height:100%"></left-menu>
        </el-aside>
        <el-main style="padding:0">         
            <transition name="slide-fade">
              <router-view />
            </transition>
        </el-main>
    </el-container>
  </div>
</template>
<script>
import LeftMenu from '@/views/ManagerHome/components/LeftMenu.vue'
export default {
name:'article-titleList',
components:{
  'left-menu':LeftMenu
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
methods:{
      
},
}
</script>

<style>
.managerHome{
  background: #ffffff;
}
</style>