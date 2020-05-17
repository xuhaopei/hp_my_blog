<template>
    <div id="HpEdit">
        
        <input class="input_Wrapper" type="text" placeholder="请输入您的标题">
        
        <div class="i_wrapper">
            <button class="iconfont icon-qianjin g-navHref g_cancleBtn" name="edit-action" title="前进" edit-action="redo"></button>
            <button class="iconfont icon-houtui g-navHref g_cancleBtn" name="edit-action" title="后退" edit-action="undo"></button>
            <button class="iconfont icon-bold g-navHref g_cancleBtn" name="edit-action" title="加粗" edit-action="bold" ></button>
            <button class="iconfont icon-qingxie g-navHref g_cancleBtn" name="edit-action" title="倾斜" edit-action="italic"></button>
            <button class="iconfont icon-suojinindent2 g-navHref g_cancleBtn" name="edit-action" title="缩进" edit-action="indent" ></button>
            <button class="iconfont icon-suojinindent3 g-navHref g_cancleBtn" name="edit-action" title="缩出" edit-action="outdent"></button>
            <button class="iconfont icon-Underline g-navHref g_cancleBtn" name="edit-action" title="下划线" edit-action="underline"></button>
            <button class="iconfont icon-baojiaquotation2 g-navHref g_cancleBtn" name="edit-action" title="双引号" edit-action=""></button>
            <button class="iconfont icon-h g-navHref g_cancleBtn" name="edit-action" title="标题" edit-action="formatBlock" edit-action-value="h1"></button>
            <button class="iconfont icon-H g-navHref g_cancleBtn" name="edit-action" title="标题列表" edit-action=""></button>
            <button class="iconfont icon-yueduye_zitizengda g-navHref g_cancleBtn" name="edit-action" title="加大" edit-action="fontsize" edit-action-value="5"></button>
            <button class="iconfont icon-yueduye_zitijianxiao g-navHref g_cancleBtn" name="edit-action" title="减小" edit-action="fontsize" edit-action-value="5"></button>
            <button class="iconfont icon-A g-navHref g_cancleBtn" name="edit-action" title="背景颜色" edit-action="foreColor"></button>
            <button class="iconfont icon-a g-navHref g_cancleBtn" name="edit-action" title="字体颜色" edit-action="backColor"></button>
            <button class="iconfont icon-tupian g-navHref g_cancleBtn" name="edit-action" title="插入图片" edit-action="insertImage" edit-action-value="http://images.cnblogs.com/cnblogs_com/qingsong/545927/o_39.gif"></button>
        </div>
        <div class="HpEdit_editContent" contenteditable="true">
            
        </div>

    </div>
</template>
<script>
export default {
    props:[],
    name:'HpEdit',
    data(){
        return{

        }
    },
    mounted(){
        this.editInit();
    },
    methods:{
        /**
         * 编辑功能初始化
         */
        editInit(){
            var edit = document.getElementsByClassName('HpEdit_editContent')[0]
            var btns = document.getElementsByName('edit-action');
            for(var i = 0; i < btns.length; i++){
                btns[i].onclick = function(){
                   console.log(this.getAttribute('edit-action'),this.getAttribute('edit-action-value'))
                   
                   console.log(document.execCommand(this.getAttribute('edit-action'),false,this.getAttribute('edit-action-value')));
                   
                }
            }
        }
    }
}
</script>
<style >
#HpEdit{
    position: relative;
    background: white;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
#HpEdit .input_Wrapper {
    height: 40px;
    text-indent: 10px;
}
#HpEdit .i_wrapper {
    display: flex;
    flex-direction: row;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(146,146,146);
    justify-content: space-around;
}
#HpEdit .HpEdit_editContent{
    box-shadow: 0px 0px 10px 10px rgb(146,146,146);
    flex:1;
}
</style>