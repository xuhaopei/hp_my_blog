<template>
  <div class="ShowCom">
    <div class="img-wrapper"></div>
    <div class="ShowCom-wrapper">
        <!-- 用户个人信息 -->
        <div>
            {{user.name}}
            <el-tag effect="dark" :type="lvs[user.lv]" size="mini">Lv{{user.lv}}</el-tag>
            <span class="study-div-introduce">
                {{user.university}} @ {{user.college}} @ {{user.class}} @ {{user.major}}
            </span>
        </div>
        <!-- 评论内容 -->
        <div style="font-size:16px">
            {{comment.content}}
        </div>
        <!-- 发布日期 点赞 回复 -->
        <div class="ShowCom-div_footer">
            <span>
                {{comment.date | date2current}}天前
            </span>
            <el-button-group>
                <el-button type="default" size="mini" icon="el-icon-thumb">1</el-button>
                <el-button type="default" size="mini" icon="el-icon-chat-square" @click="reply()">回复</el-button>
            </el-button-group>
        </div>
        <!-- 回复 -->
        <reply-com v-if="isReply"></reply-com>
        <div style="background:rgba(0,0,0,0.05)">
            <show-com v-show="comment.children.length"  v-for="(com,index) of comment.children" :comment="com" :key="index"></show-com>
        </div>
    </div>
  </div>
</template>

<script>

import ReplyCom from    '@/views/ReadArticle/components/ReplyCom.vue';

export default {
name:'show-com',
components:{
    'reply-com':ReplyCom
},
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
                commentId:0,
                commentPId:0,
                children:[
                ]
            }
        }
    }
},
data(){
    return {
         lvs:['info','success','danger','warning'],
         isReply:false,
    }
},
computed:{},
watch:{},
created(){
},
mounted(){},
beforeDestory(){},
methods:{
    reply(msg){
        this.isReply = !this.isReply;
    },
},
}
</script>

<style lang="less" scoped>
.ShowCom{
    display: flex;
    flex-direction: row;
    justify-content: row;
    padding: 10px 0;
    .ShowCom-wrapper{
        flex:1;
        font-size:13px;
    }
    .ShowCom-div_footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        span{
            color:rgba(0,0,0,0.5);
        }
        margin-bottom: 10px;
    }
    .img-wrapper{
        height: 50px;
        width: 50px;
        border-radius: 50px;
        background-color: brown;
        margin-right:10px;
    }
}
</style>