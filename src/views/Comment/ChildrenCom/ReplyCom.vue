<template>
  <div class="ReplyCom">
    <el-row >
    <el-col :span="24">
        <el-input
            type="textarea"
            autosize
            :placeholder="'回复' + user.name"
            v-model="textarea1">
        </el-input>
    </el-col>
    </el-row>
    <el-row >
       
    <el-col :span="20">
        <div>
            <el-link icon="el-icon-ice-cream">表情</el-link>
            <el-link><i class="el-icon-picture-outline"></i>图片 </el-link>
        </div>
    </el-col>
    <el-col :span="4">
        <el-button type="primary" plain>评论</el-button>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
name:'ReplyCom',
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
    .ReplyCom{
        background-color: rgba(0,0,0,0.1);
    }
</style>