<template>
    <div class="TopNavByEle">
        <el-row>
            <el-col :span="22" :offset="1">
                <el-row class="TopNavByEle-div-wrapper">
                    <!-- 笔记头像图片 -->
                    <el-col :span="4" >
                        <div class="img-wrapper">
                           <strong> 笔记</strong></div>
                    </el-col>
                    <!-- 各个小导航 -->
                    <el-col :span="3">
                        <router-link v-for="(value,index) of links" :key="index" :to="value.address" style="margin-left:10px;">{{value.name}}</router-link>
                    </el-col>
                    <!-- 输入框 -->
                    <el-col :span="7" >
                        <el-input placeholder="请输入内容" v-model="search.content" class="input-with-select"  @keyup.native.enter="doSearch()">
                                <el-select v-model="search.select" slot="prepend" placeholder="查询类别">
                                <el-option label="个人文章" value="1"></el-option>
                                <el-option label="群体文章" value="2"></el-option>
                                <!-- <el-option label="用户" value="3"></el-option> -->
                                </el-select>
                                <el-button slot="append" icon="el-icon-search" @click="doSearch()"></el-button>
                        </el-input>
                    </el-col>
                    <!-- 创建文章 -->
                    <el-col :span="2">
                        <el-button type="primary" @click="$router.push('/CreateArticle')">创建文章</el-button>
                    </el-col>
                    <!-- 个人信息 -->
                    <el-col :span="3">
                        <div style="position:relative;height:60px;min-width: 160px;z-index:999">
                            <el-menu   :router="true" class="el-menu-demo" mode="vertical" @select="handleSelect">
                                <el-submenu v-if="$store.state.people.user"  index="1">
                                    <template slot="title"><i class="el-icon-user"></i>{{$store.state.people.user.userName}}</template>
                                    <el-submenu index="1-1">
                                        <template slot="title"><i class="el-icon-edit"></i>文章管理</template>
                                        <el-menu-item index="/Home/UserHome">我的文章</el-menu-item>
                                        <el-menu-item index="/CreateArticle">创建文章</el-menu-item>
                                    </el-submenu>
                                    <!-- <el-menu-item index="/Home/MessageHandle" > <i class="el-icon-bell"></i>消息管理</el-menu-item> -->
                                    <el-menu-item :index="'/Home/UserSetting/'+user.id" > <i class="el-icon-setting"></i>设置</el-menu-item>
                                    <el-menu-item index="/" @click="logout()"> <i class="el-icon-truck"></i>登出</el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else index="/LoginByEle"> <i class="el-icon-user"></i> 登录 / 注册 </el-menu-item>
                            </el-menu> 
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>

import {clearToken} from '@/network/Token.js';

export default {
    props:{
        title:{
            type:String,
            default:"正义的键盘侠"
        }
    },
    data(){
        return {
            user:{},
            searchContent:'',
            links:[
                {
                    name:'首页',
                    address:'/',
                },
            ],
            search:{
                content:'',
                select:'2',
            },
            activeIndex:'1',

        }
    },
    created(){
        
    },
    mounted(){
        this.user = JSON.parse(localStorage.getItem('user'));
    },
    watch:{
        $route(to, from){
            let fromName = from.name;
            // 当从'/EditArticle'跳转时
            if(fromName === 'Login') {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        }
    },
    methods:{
        /**
         * 点击搜索按钮。
         */
        doSearch(obj){
            switch (this.search.select){
                //  个人文章查询
                case '1' :
                    this.$router.push({
                        path:'/Home-',
                        query:{
                            uId:this.$store.state.people.user.id,
                            content:this.search.content,
                        }
                    })
                    break;
                // 群体文章查询    
                case '2' :
                    this.$router.push({
                        path:'/Home-',
                        query:{
                            content:this.search.content,
                        }
                    })                    
                    break;
                // 用户查询    
                case '3' :
                    break;                                        
            }
        },
        /**
         * 
         */
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
        },
        logout(){
            this.$store.commit('clearUser');
            localStorage.removeItem('user'); 
            localStorage.removeItem('token');
        }
    }
    
}
</script>
<style lang="less">
.TopNavByEle{
    background-color: #FFFFFF;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    .img-wrapper {
        height: 60px;
        line-height: 60px;
        color: black;
        text-align: center ;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 30px;
        border-radius: 10px;
        
    }
    .TopNavByEle-div-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        
    }
    .el-select .el-input {
    width: 110px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .el-menu-item {
        min-width: auto;
    }
}

</style>