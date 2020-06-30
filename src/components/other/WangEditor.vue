<template>
    <div id="wangeEdit">
        <div id="wangeEditToolBar" class="toolbar">
        </div>
        <div id="wangeEditWrapper" v-on:mouseout="putEditContent" style="">
        </div>

    </div>
</template>
<script>
import E from "wangeditor";

export default {
    model: {
        prop: 'content',
        event: 'change'
    },
    props:{
        content:{
            type:String
        }
    },
    name:'wangeEdit',
    data(){
        return{
            newContent:this.content,
            editor:Object
        }
    },
    watch:{
        content:function(val, oldVal) {
            this.newContent = val;
            //document.getElementById('HpEdit_editContent').innerHTML = val;
            this.setEditHTMLContent(val);
        }
    },
    mounted(){
        this.createEdit();
    },
    methods:{
        createEdit(){
            this.editor = new E('#wangeEditToolBar','#wangeEditWrapper');
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'fontSize',  // 字号
                'fontName',  // 字体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'foreColor',  // 文字颜色
                'backColor',  // 背景颜色
                'link',  // 插入链接
                'list',  // 列表
                'justify',  // 对齐方式
                'quote',  // 引用
                'emoticon',  // 表情
                'image',  // 插入图片
                'table',  // 表格
                'video',  // 插入视频
                'code',  // 插入代码
                'undo',  // 撤销
                'redo'  // 重复
            ];
            this.editor.customConfig.pasteFilterStyle = false;
            this.editor.create();
        },
        getEditHTMLContent(){
            return this.editor.txt.html()
        },
        getEditTXTContent(){
            return this.editor.txt.text()
        },
        setEditHTMLContent(val){
            this.editor.txt.html(val)
        },
        /**
         * 将数据传给父组件
         */
        putEditContent(){
            let articleContent = this.getEditHTMLContent();
            this.$emit('change', articleContent);                    // 父组件用v-modle来接收 所以事件要用input
        }
    }
}
</script>
<style  lang='less'>

/**隐藏颜色表 */

#wangeEdit{
    position: relative;
    background: white;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 545px;
    .toolbar{
         border-bottom:1px solid rgba(146,146,146,0.8);
    }
    #wangeEditWrapper {
        height: 94%;
        border-bottom:1px solid rgba(146,146,146,0.8);
    }
}


</style>