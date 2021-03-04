<template>
    <div class="smallLiks">
        <el-row > 
            <el-col :span="20" :offset="2">
                <div class="smallLiks-div-wrapper">
                    <router-link  :to="links[0].link" >
                        <el-button  type="primary" round size="mini" style="margin:5px" >全部</el-button>
                    </router-link>
                    <router-link v-for="(value,index) of links"  :to="value.link + value.content" :key="index">
                        <el-button round size="mini" style="margin:5px">{{value.content}}</el-button>
                    </router-link>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'SmallLiks',
    components:{},
    model:{},
    props:{
        links:{
            type:Array,
            default:function(){
                return [{
                    link:'/',
                    content:'',
                }]
            },
            required:true,

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
<style lang="less">
.smallLiks{
    .smallLiks-div-wrapper{
        padding: 20px 0;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: start;
        flex-wrap:wrap;
    }
}
</style>