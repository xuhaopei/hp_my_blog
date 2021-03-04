<template>
  <div class="study">
        <div class="study-div-header">
            <i class="el-icon-medal" ></i>学习榜
        </div>
        <div class="study-div-body">
            <router-link v-for="(user,index) of users" :key="index" to="/"  class="study-div-body-links-wrapper">
                <div class="study-div-body-left">
                    <div class="img-wrapper"></div>
                </div>
                <div class="study-div-body-right">
                    <div>
                        {{user.name}}
                        <el-tag effect="dark" :type="lvs[user.lv]" size="mini">Lv{{user.lv}}</el-tag>
                    </div>
                    <div class="study-div-introduce" :title="user.university +'@'+ user.college +'@'+user.class +'@'+user.major">
                        {{user.university}} @ {{user.college}} @ {{user.class}} @ {{user.major}}
                    </div>
                </div>
            </router-link>
        </div>
        <div class="study-div-footer">
           <router-link to="all" style="color:#007fff">完整榜单 <i class="el-icon-arrow-right"></i> </router-link>
        </div>
  </div>
</template>

<script>
export default {
    name:'ArticleTitleList',
    components:{},
    model:{},
    props:{
        users:{
            type:Array,
            default:function(){
                return [
                        {
                            name:'许浩培',
                            lv:'1',
                            university:'广东技术师范大学',
                            college:'计算机科学学院',
                            major:'计算机科学技术',
                            class:'大三',
                            id:0,
                        },
                        {
                            name:'许浩培',
                            lv:'0',
                            university:'广东技术师范大学',
                            college:'计算机科学学院',
                            major:'计算机科学技术',
                            class:'大三',
                            id:0,
                        },                        {
                            name:'许浩培',
                            lv:'3',
                            university:'广东技术师范大学',
                            college:'计算机科学学院',
                            major:'计算机科学技术',
                            class:'大三',
                            id:0,
                        },                        {
                            name:'许浩培',
                            lv:'1',
                            university:'广东技术师范大学',
                            college:'计算机科学学院',
                            major:'计算机科学技术',
                            class:'大三',
                            id:0,
                        },
                ]
            }
        }
    },
    data(){
        return {
            lvs:['info','success','danger','warning']
        }
    },
    computed:{},
    watch:{},
    created(){
    },
    mounted(){},
    beforeDestory(){},
    methods:{}
}
</script>

<style lang="less">
    .study {
        position: relative;
        background: #FFFFFF;
        .study-div-header {
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            padding:12px ;
        }
        .study-div-body{
            position: relative;
            display: flex;
            flex-direction:column;
            padding: 0px 12px;
            .study-div-body-links-wrapper{
                display: flex;
                flex-direction: row;
                padding: 15px 0;
                .study-div-body-left {
                    margin-right: 12px;
                    .img-wrapper{
                        height: 50px;
                        width: 50px;
                        border-radius: 50px;
                        background-color: brown;
                    }
                }
                .study-div-body-right{
                    overflow: hidden;
                    .study-div-introduce{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        color:rgba(0,0,0,0.5);
                        font-size:12px;
                    }
                }
            }

        }
        .study-div-footer {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding:10px;
            border-top:1px solid rgba(0,0,0,0.1)
        }
    }
</style>