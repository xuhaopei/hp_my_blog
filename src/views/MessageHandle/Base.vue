<template>
  <div class="messageHandle">
      <el-row>
        <el-col :span="20" :offset="2" class="messageHandle-wrapper">
                   <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="评论消息" name="first">
                        <reply></reply>
                        <reply></reply>
                        <reply></reply>
                        <reply></reply>
                        <reply></reply>
                        <reply></reply>
                    </el-tab-pane>
                    <el-tab-pane label="点赞消息" name="second">点赞消息</el-tab-pane>
                    <el-tab-pane label="关注消息" name="third">关注消息</el-tab-pane>
                    <el-tab-pane label="系统消息" name="fourth">系统消息</el-tab-pane>
                   </el-tabs>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Reply from '@/views/MessageHandle/components/Reply.vue'

export default {
name:'message-handle',
components:{
    'reply':Reply
},
model:{},
props:{},
data(){
    return {
        activeName: 'first'
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

<style lang="less">
.messageHandle{
    margin-top:20px;
    .messageHandle-wrapper{
        background-color: #ffffff;
        padding:0 15px;
        border-top:1px solid rgba(0,0,0,0.1) ;
    }
}
</style>