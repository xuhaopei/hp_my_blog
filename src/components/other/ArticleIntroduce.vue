<template>
  
<div class="ArticleIntroduce">
    <div class="Article_warpper">
      <div class="Article_warpper_top">
        <div class='left'>
          <span class="Article_date">{{ article.alertDate | dateInit }}</span>
          <!-- <el-button-group>
            <el-button type="default" size="mini" icon="el-icon-thumb">{{article.like}}</el-button>
            <el-button type="default" size="mini" icon="el-icon-chat-square">{{article.comments}}</el-button>
            <el-button type="default" size="mini" icon="el-icon-share"></el-button>
          </el-button-group> -->
        </div>
      </div>
      <div class="Article_warpper_body">
          <router-link
            :to="'/Home/ReadArticle/' + article.id"
            class="Article_title"
            v-html="article.articleName "
          >
          </router-link>
      </div>
      <div class="Article_warpper_bottom">
        <div class="Article_tags" v-if="article.tags.length != 0">
                <el-tag
                    v-for="(tag,index) of TagsToArray(article.tags)" 
                    :key='index' 
                    type="info"
                    effect="plain"
                    style="margin-right:10px"
                    v-html="tag"
                    >
                </el-tag>
        </div>
        <div class="Article-btns-control_wrapper">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {
  searchArticle, 
  getSearchAllArticleNumber,
  } from '@/network/Article.js';

import {TagsToArray} from '@/utils/StrToArray.js'
import {strKeyToSpan} from '@/utils/StrToHtml.js'
export default {
  props: {
    article: {
      type: Object,
      default: function() {
        return     {
              alertDate: "2021-02-04T01:15:33.000Z",
              articleName: "存储1",
              id: 150,
              pid: 97,
              tags: '浏览器,服务器,必会,cookie',
              like:'6',
              comments:'3',
        }
      }
    }
  },
  data() {
    return {
    };
  },
  created(){
 
    let key = this.$route.query.content ? this.$route.query.content : "";
    this.article.articleName =  strKeyToSpan(this.article.articleName , key);
    this.article.tags = strKeyToSpan(this.article.tags , key);
 },
  mounted(){
    
  },
  methods: {
    TagsToArray:TagsToArray,
  },
  computed:{
  },
  watch:{
  }
};
</script>
<style lang="less">
.ArticleIntroduce {
  position: relative;
  min-width: 400px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  .Article_warpper {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: 15px 25px;
    display: flex;
    flex-direction: column;
    .Article_warpper_top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      .Article_date {
        padding: 5px;
        color: gray;
        margin-right: 20px;
      }
      .Article_title {
      }
    }
    .Article_warpper_body {
      position: relative;
      margin-top: 5px;
      margin-bottom: 15px;
      .Article_content {
        text-indent: 20px;
        white-space: nowrap;
        overflow: hidden; 
        text-overflow:ellipsis;
      }
      .Article_forward {
        display: block;
        color: rgb(93, 243, 93);
      }
      .Article_title {
        font-weight: 600;
        font-size: 22px;
        line-height: 30px;
      }
    }
    .Article_warpper_bottom {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: rgba(104, 37, 37, 0.4);
      font-size: 12px;
      flex-wrap: wrap;
      .Article_author {
        margin-right: 10px;
      }
      .Article_tags {
          position: relative;
          display: flex;
          flex-direction: row;
          justify-content: start;
          flex-wrap: wrap;
      }
      .Article-btns-control_wrapper{

      }
    }
  }
  .pageControl_wrapper {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    flex-direction: row;
    justify-content: center;
    margin: 10px;
  }
}

</style>