<template>
  <div class="UserHome" >
      <el-row :gutter="15">
          <!-- 文件夹目录 -->
          <el-col :span="5" >
              <div class="UserHome-left__wrapper">
                <hp-nav-item></hp-nav-item>
              </div>
          </el-col>
          <!-- 显示所有文章 -->
          <el-col :span="14">
              <div class="UserHome-middle__wrapper">
                <!-- 表格内容 -->
                <el-table
                    :data="tableData"
                    ref="multipleTable"
                    @select-all = "seletAllArticle"
                    @select="handleSelect"
                    style="width: 100%">
                    <!-- 序号 -->    
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <!-- 文章主体内容 -->
                    <el-table-column
                    label="文章">
                        <template slot-scope="scope">
                            <article-introduce :article="scope.row"></article-introduce>
                        </template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <!-- 编辑 -->
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)" 
                        icon="el-icon-edit-outline"></el-button>
                        <!-- 查看 -->
                        <el-button 
                        type="primary" 
                        size="mini" 
                        icon="el-icon-view"></el-button>
                        <!-- 删除 -->
                        <el-button 
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)" 
                        icon="el-icon-document-delete"></el-button>

                    </template>
                    </el-table-column>
                </el-table>
                <!-- 多选控制 -->
                <div style="margin-top: 20px;display:flex; flex-direction: row;justify-content: flex-end;" >
                    <el-button @click="cancelSelect()">取消选择</el-button>
                    <el-button @click="deleteAllSelecteds(allSelectedArticleIds)" type="danger" icon="el-icon-document-delete">删除所选</el-button>
                </div>
              </div>
          </el-col>
          <!-- 计划表 -->
          <el-col :span="5">
              <calender-plan></calender-plan>
          </el-col>
          <button @click="test()">123</button>
      </el-row>
  </div>
</template>
<script>

import HpNavItem from "@/components/other/HpNavItem.vue"
import ArticleIntroduce from "@/components/other/ArticleIntroduce.vue"
import CalenderPlan from "@/components/other/CalenderPlan.vue";

import {throttle} from "@/assets/js/throttle.js";

export default {
    name:'user-home',
    components:{
        'hp-nav-item':HpNavItem,
        'article-introduce':ArticleIntroduce,
        'calender-plan':CalenderPlan,
    },
    model:{},
    props:{},
    data(){
        return {
            tableData:[
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
            multipleSelection: [],
            allSelectedArticleIds:new Set(), // 避免id重复
        }
    },
    computed:{},
    watch:{},
    created(){
    },
    mounted(){
      this.addTableData();
    },
    beforeDestroy(){
      throttle.removeScrool();
    },
    destroyed(){
    },
    methods:{
      /**
       * 取消选择
       */
      cancelSelect(){
          this.$refs.multipleTable.clearSelection();
          this.allSelectedArticleIds.clear();
      },
      /**
       * 判断是否删除或者添加文章id
       */
      handleSelect(selection, row){

          // 如果存在id则说明是取消操作
          if(this.allSelectedArticleIds.has(row.id)) {
              this.allSelectedArticleIds.delete(row.id);
          
          // 如果不存在id则说明是添加操作
          } else {
              this.allSelectedArticleIds.add(row.id);
          }
          
      },
      /**
       * set: 保存所有文章id
       * 根据set里面的id删除所有文章。
       */
      deleteAllSelecteds(set){
        this.$confirm('此操作将永久删除所选文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            
          // 这里进行删除操作。  
          console.log(set);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      /**
       * selection 表格数据
       * 将selection里面文章的id存储进this.allSelectedArticleIds
       */
      seletAllArticle(selection){
          // 不为0 则选择了全部
          if(selection.length != 0) {
            selection.forEach((v)=>{
                this.allSelectedArticleIds.add(v.id);
            })
            console.log(this.allSelectedArticleIds)
          // 为0 则取消了所有选择
          } else {
              this.allSelectedArticleIds.clear();
          }
      },
      /**
       * index 表格行下标
       * article 表格的行数据
       * 根据进入编辑文章页
       */
      handleEdit(index, article){
          this.$router.push("/EditArticle/" + article.id);
      },
      /** 
       * 删除对应文章
      */
      handleDelete(index, article){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      /**
       * 懒加载数据
       */
      addTableData(){
          let temp =  
            {
                alertDate: "2021-02-04T01:15:33.000Z",
                articleName: "存储",
                id: 151,
                pid: 97,
                tags: '浏览器,服务器,必会,cookie',
                like:'6',
                comments:'3',
            }
          
          throttle.scroolRun(100,()=>{
            return new Promise((resolve,reject)=>{
              setTimeout(() => {
                this.tableData.push(temp);
                resolve();
              }, 1000);
            })
          });
      },
    },

}
</script>

<style lang="less" scoped>
.UserHome{
    margin-top:10px;
    .UserHome-left__wrapper{
        background-color: #ffffff;
        padding:10px;
        border-top: 1px solid rgba(0,0,0,0.1);
    }
    .UserHome-middle__wrapper{
        background-color: #ffffff;
        border-top: 1px solid rgba(0,0,0,0.1);
        padding:10px;
    }
}
</style>