<template>
  <div class="LeftMenu">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <!-- 首页 -->
      <el-menu-item index="/ManagerHome">
        <i class="el-icon-user"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 数据管理 -->
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/ManagerHome/User">用户列表</el-menu-item>
        <el-menu-item index="/ManagerHome/Article">文章列表</el-menu-item>
      </el-submenu>
      <!-- 添加数据 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-plus"></i>
          <span>添加数据</span>
        </template>
        <el-menu-item index="/ManagerHome/AddUser">添加用户</el-menu-item>
      </el-submenu>
      <!-- 设置 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>设置</span>
        </template>
        <el-menu-item index="/ManagerHome/Setting">个人资料</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
name:'article-titleList',
components:{},
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

<style lang="less" scoped>
.el-menu-vertical-demo{
  height: 100%;
}
</style>