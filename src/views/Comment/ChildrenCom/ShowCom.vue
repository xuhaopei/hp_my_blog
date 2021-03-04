<template>
  <div class="ShowCom">
    <el-row >
    <el-col :span="3">
        <div class="img-wrapper"></div>
    </el-col>
    <el-col :span="21">
        <!-- 用户个人信息 -->
        <div>
            {{user.name}}
            <el-tag effect="dark" :type="lvs[user.lv]" size="mini">Lv{{user.lv}}</el-tag>
            <span class="study-div-introduce">
                {{user.university}} @ {{user.college}} @ {{user.class}} @ {{user.major}}
            </span>
        </div>
        <!-- 评论内容 -->
        <div>
            {{comment.content}}
        </div>
        <!-- 发布日期 点赞 回复 -->
        <div class="ShowCom-div_footer">
            <span>
                {{content.date | date2current}}
            </span>
            <el-button-group>
                <el-button type="default" size="mini" icon="el-icon-thumb"></el-button>
                <el-button type="default" size="mini" icon="el-icon-chat-square"></el-button>
            </el-button-group>
        </div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name:'ArticleTitleList',
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
    }
},
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
.ShowCom{
    .ShowCom-div_footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span{
            color:rgba(0,0,0,0.5);
        }
    }
}
</style>