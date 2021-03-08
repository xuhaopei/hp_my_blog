<template>
  <div class="Reply">
    <el-row >
        <el-col :span="1.5">
            <!-- 用户头像 -->
            <div class="img-wrapper"></div>
        </el-col>
        <el-col :span="21">
            <!-- 用户个人信息 -->
            <div>
                {{user.name}}
                <el-tag effect="dark" :type="lvs[user.lv]" size="mini">Lv{{user.lv}}</el-tag>
                <span v-if="1">
                    回复了你在文章<router-link style="color:#409EFF" :to="'/ReadArticle/'+article.id">{{article.title}}</router-link>下的评论
                </span>
                <span v-else>
                    评论了你的文章<router-link style="color:#409EFF" :to="'/ReadArticle/'+article.id">{{article.title}}</router-link>
                </span>
            </div>
            <!-- 评论内容 -->
            <div class="reply-content">
                {{comment.content}}
            </div>
            <!-- 发布日期 点赞 回复 -->
            <div class="ShowCom-div_footer">
                <span>
                    {{comment.date | date2current}}天前
                </span>
            </div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name:'reply',
components:{},
model:{},
props:{
    user:{
        type:Object,
        default:function(){
            return {
                name:'许浩培',
                lv:'1',
                university:'广东技术师范大学',
                college:'计算机科学学院',
                major:'计算机科学技术',
                class:'大三',
                id:0,
            }
        },
    },
    comment:{
        type:Object,
        default:function(){
            return {
                content:'666',
                date:'2020-12-15T13:23:59.000Z',
            }
        }
    },
    article:{
        type:Object,
        default:function(){
            return {
                title:'存储',
                id:150
            }
        }
    },
},
data(){
    return {
         lvs:['info','success','danger','warning'],
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

<style lang="less">
.Reply{
    margin: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    padding: 10px;
    .img-wrapper{
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background-color: brown;
        margin-right:10px;
    }
    .reply-content{
        padding:10px;
        background: rgba(0,0,0,0.01);
        border:1px solid rgba(0,0,0,0.1);
        margin:10px 0px;
    }
}

</style>