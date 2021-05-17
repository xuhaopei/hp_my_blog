<template>
  <div>
    <div class="ReadArticle__top--wrapper g_layout_flex_column ">
      <div class="ArticleMessage--wrapper g_layout_flex_justify-content_space-between">
        <div class="UserMessage--wrapper g_layout_flex_row">
          <div class="UserMessage__profilePhoto g_layout_flex_column_flex_end">
            <span class="profile">{{article.author&&article.author[0]}}</span>
          </div>
          <div class="g_layout_flex_column_flex_end">
            <strong style="font-size:20px;">{{article.author}}</strong>
            <div class="">
              <span style="margin-right:20px">{{article.alertDate | dateInit}}</span>
              <el-tag
                    v-for="(tag,index) of TagsToArray(article.tags)" 
                    :key='index' 
                    type="info"
                    effect="plain"
                    style="margin-right:10px"
                    >
                    {{tag}}
                </el-tag>
              <!-- <span class="g_tag" v-for="(tag,index) of TagsToArray(article.tags)" :key='index' v-html="tag"></span> -->
            </div>
          </div>
        </div>
        <!-- <div class="guanzhu">关注</div> -->
      </div>
      <h1>{{article.articleName}}</h1>
    </div>
  </div>
</template>

<script>
import {TagsToArray} from '@/utils/StrToArray.js'

export default {
    props:{
        article:{
            type:Object,
            default:function(){
                return {
                    alertDate:'',
                    articleContent:'',
                    articleContentText:'',
                    articleName:'无内容',
                    author:'',
                    id:0,
                    pid:0,
                    read:0,
                    tags:''
                }
            }
        },
    },
    methods:{
      TagsToArray:TagsToArray
    }
}
</script>

<style lang="less" scoped>

.UserMessage__profilePhoto {
  .profile{
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #006699;
    color: white;
    margin-bottom: 0px;
    margin-right: 10px;
    font-size: 2vw;
  }
}
.ArticleMessage--wrapper {
  align-items: center;
  .guanzhu {
    margin: 20px;
    padding: 0;
    min-width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #6cbd45;
    color: #6cbd45;
    background-color: #fff;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
  }
}
.ReadArticle__top--wrapper{
  padding: 15px;
  z-index: 99;
  background-color: #FFFFFF;
}
</style>