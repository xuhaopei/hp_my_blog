<template>
        <div id="AllArticle">
            <div class="Article_warpper" v-for=" (item,index) of allAricle" :key='index'>
                <div class="Article_warpper_top"> 
                    <span class="Article_date">{{item.creatDate}}</span>
                    <span class="Article_title"> {{item.articleName}} </span>
                </div>
                <div class="Article_warpper_body">
                    摘要：
                    <div class="Article_content" v-html="item.articleContent">
                        
                    </div>
                    <router-link :to='"/ReadArticle/"+item.articleId' class="Article_forward"> 阅读全文 </router-link>
                </div>
                <div class="Article_warpper_bottom">
                    <span class="Article_author">
                        {{item.articleAuthor}}
                    </span>
                    <span class="Article_readTime">
                        阅读数({{item.read}})
                    </span>
                </div>
            </div>
            <div class="btn_group">
                <button>上一页</button>
                <button>上一页</button>
                <button>下一页</button>
            </div>
        </div>
</template>
<script>
export default {
    props:{
        allAricle:{
            type:Array,
            default:function(){
                return [
                    {
                        articleId:1,
                        articleName:'xhp',
                        articleContent:'123',
                        creatDate:'20134221',
                        articleAuthor:'正义的键盘侠',
                        read:100
                    },
                    
                    {
                        articleId:1,
                        articleName:'xhp',
                        articleContent:'12zxcasasasasasasasasasasasasasasasasaasdzxcjhbascjhgzxkcgssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaksasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasas3',
                        creatDate:'20134221',
                        articleAuthor:'正义的键盘侠',
                        read:100
                    },
                    {
                        articleId:1,
                        articleName:'xhp',
                        articleContent:'123',
                        creatDate:'20134221',
                        articleAuthor:'正义的键盘侠',
                        read:100
                    }
                ]
            }
        }
    },
    data(){
        return {
            
        }
    },
    created(){

    },
    methods:{
        /**
         * 获取文章
         */
        async getAllArticle(){
            this.$animation.createLoading();
            
            this.$animation.cancelLoading();
        }
    }
}
</script>
<style lang="less">
    #AllArticle {
        position: relative;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 1080px;
        .Article_warpper {
            position: relative;
            width: 100%;
            box-sizing: border-box;
            background: white;
            border-radius:10px;
            padding: 15px 25px;
            box-shadow: 0px 0px 5px 5px rgb(146,146,144);
            display: flex;
            flex-direction: column;
            .Article_warpper_top{
                display: flex;
                flex-direction: row;
                margin-bottom: 10px;
                .Article_date{
                    background: rgb(87, 191, 240);
                    padding: 5px;
                    color: white;
                    line-height: 30px;
                    margin-right:20px ;
                }
                .Article_title {
                    font-size: 30px;
                }
            }
            .Article_warpper_body{
                width:100%;
                position: relative;
                margin-bottom: 10px;
                font-size: 16px;
                line-height: 25px;
                .Article_content {
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .Article_forward {
                    display:block;
                    color:rgb(93, 243, 93);
                }
            }
            .Article_warpper_bottom{
                display: flex;
                flex-direction: row;
                color:rgba(104, 37, 37, 0.4);
                font-size: 12px;
                .Article_author{
                    margin-right: 10px;
                }
            }

        }
        .Article_warpper:hover{
            margin-bottom:5px ;
            box-shadow: 0px 0px 5px 5px rgb(33, 165, 226);
            
        }
        .btn_group {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            flex-direction: row;
            justify-content: space-around;

        }
    }
</style>