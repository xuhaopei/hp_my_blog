<template>
  <div class="Main">
      <el-row > 
          <!-- 标签选项 -->
          <small-links :links='links'></small-links>
          <el-col :span="20" :offset="2">
            <el-row :gutter="30">
              <!-- 热门、最新、热榜 -->
              <el-col :span="18"  style="background:#FFFFFF;">
                    <el-tabs  type="card" v-model="activeName" @tab-click="handleClick" style="padding:10px">
                    <el-tab-pane label="热门" name="first">
                      <article-introduce v-for="(article,index) of articles" :key="index" :article="article"></article-introduce>
                    </el-tab-pane>
                    <el-tab-pane label="最新" name="second">
                      <!-- <all-article></all-article> -->
                    </el-tab-pane>
                  </el-tabs>
              </el-col>
              <el-col :span="6">
                <!-- 作者榜 -->
                <study></study>
                <!-- 计划表 -->
                <calender-plan></calender-plan>
              </el-col>
            </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>

import Study from "@/views/Announcement/Study.vue";
import SmallLinks from "@/components/other/SmallLinks.vue";
import ArticleIntroduce from "@/components/other/ArticleIntroduce.vue";
import CalenderPlan from "@/components/other/CalenderPlan.vue";

export default {
    name:'Main',
    components:{
        'small-links':SmallLinks,
        'article-introduce':ArticleIntroduce,
        'study':Study,
        'calender-plan':CalenderPlan,
    },
    model:{},
    props:{},
    data(){
        return {
        activeName: 'first',
        links:[
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
                    {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
                    {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
                    {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
                    {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
                    {
            link:'/user/all/article/query/',
            content:'javaScript'
            },     
            {
            link:'/user/all/article/query/',
            content:'javaScript'
            }, 
            {
            link:'/user/all/article/query/',
            content:'javaScript1'
            }, 
        ],
        articles:[
            {
                alertDate: "2021-02-04T01:15:33.000Z",
                articleName: "存储1",
                id: 150,
                pid: 97,
                tags: '浏览器,服务器,必会,cookie',
                like:'6',
                comments:'3',
            },
            {
                alertDate: "2021-02-04T01:15:33.000Z",
                articleName: "存储2",
                id: 151,
                pid: 97,
                tags: '浏览器,服务器,必会,cookie',
                like:'6',
                comments:'3',
            },
            {
                alertDate: "2021-02-04T01:15:33.000Z",
                articleName: "存储3",
                id: 152,
                pid: 97,
                tags: '浏览器,服务器,必会,cookie',
                like:'6',
                comments:'3',
            },
            ],
        }
    },
    computed:{},
    watch:{},
    created(){
    },
    mounted(){},
    beforeDestory(){},
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
}
</script>

<style>

</style>