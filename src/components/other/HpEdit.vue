<template>
    <div id="HpEdit">
        <div class="btn_wrapper">
            <button class="iconfont icon-qianjin g-navHref g_btn" name="edit-action" title="前进" edit-action="redo"></button>
            <button class="iconfont icon-houtui g-navHref g_btn" name="edit-action" title="后退" edit-action="undo"></button>
            <button class="iconfont icon-bold g-navHref g_btn" name="edit-action" title="加粗" edit-action="bold" ></button>
            <button class="iconfont icon-qingxie g-navHref g_btn" name="edit-action" title="倾斜" edit-action="italic"></button>
            <button class="iconfont icon-suojinindent2 g-navHref g_btn" name="edit-action" title="缩进" edit-action="indent" ></button>
            <button class="iconfont icon-suojinindent3 g-navHref g_btn" name="edit-action" title="缩出" edit-action="outdent"></button>
            <button class="iconfont icon-Underline g-navHref g_btn" name="edit-action" title="下划线" edit-action="underline"></button>
            <button class="iconfont icon-baojiaquotation2 g-navHref g_btn" name="edit-action" title="双引号" edit-action="insertHTML" edit-action-value="&#8243;" ></button>
            <button class="iconfont icon-h g-navHref g_btn" name="edit-action" title="标题" edit-action="formatBlock" edit-action-value="h1"></button>
            <button class="iconfont icon-H g-navHref g_btn" name="edit-action" title="标题列表" edit-action="hs" v-on:click="createHs"></button>
            <button class="iconfont icon-yueduye_zitizengda g-navHref g_btn" name="edit-action" title="加大" edit-action="fontsize" edit-action-value="1"></button>
            <button class="iconfont icon-yueduye_zitijianxiao g-navHref g_btn" name="edit-action" title="减小" edit-action="fontsize" edit-action-value="-1"></button>
            <div class="iconfont icon-A g-navHref g_btn" style="position:relative"><input class="input_type_color g-navHref" name="edit-action" title="字体颜色" edit-action="foreColor" type="color"/></div>
            <div class="iconfont icon-a  g-navHref g_btn" style="position:relative"><input class="input_type_color g-navHref" name="edit-action" title="背景颜色" edit-action="backColor" type="color"/> </div>
            <div class="iconfont icon-tupian g-navHref g_btn" style="position:relative"><input class="input_type_color g-navHref" name="edit-action" title="插入图片" edit-action="insertImage" type="file"/> </div>
        </div>
        <div 
            class="HpEdit_editContent" 
            contenteditable="true" 
            id="HpEdit_editContent" 
            v-on:mouseout="putEditContent"
            >
        </div>
    </div>
</template>
<script>
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
    name:'HpEdit',
    data(){
        return{
            newContent:this.content
        }
    },
    watch:{
        content:function(val, oldVal) {
            this.newContent = val;
            document.getElementById('HpEdit_editContent').innerHTML = val;
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
            var btns = document.getElementsByName('edit-action');
            var that = this;
            var flag = false;   // 用来解决input file change时 多次重复执行。 
            for(var i = 0; i < btns.length; i++){
                btns[i].onclick = function(){
                    flag = true;
                    var str = this.getAttribute('edit-action');
                    switch(str) {
                        case "hs":
                            that.createHs(this);
                            break;
                        case "fontsize": 
                            var fonSize = document.queryCommandValue('fontSize');
                            var newfonSize = Number(fonSize) + Number(this.getAttribute('edit-action-value'));
                            document.execCommand(this.getAttribute('edit-action'),false,newfonSize); 
                            break;
                        case "foreColor":
                            this.addEventListener("change",()=>{
                                document.execCommand(this.getAttribute('edit-action'),false,this.value);
                            },false);
                            break;
                        case "backColor":
                            this.addEventListener("change",()=>{
                                document.execCommand(this.getAttribute('edit-action'),false,this.value);
                            },false);
                            break;
                        case "insertImage":
                            this.addEventListener("change",()=>{
                                if(flag) {
                                    var src = this.value.replace(/\\/g,"/");
                                    document.execCommand('insertHTML', false, '<img src="' + src + '" width=100 height=100>');
                                    flag = false;
                                }
                            },false);
                            break;
                        default :
                            console.log(this.getAttribute('edit-action'),);
                            console.log(document.execCommand(this.getAttribute('edit-action'),false,this.getAttribute('edit-action-value')));
                    }
                    
                }
            }
        },
        /**
         * 创建可视化H标签 
         */
        createHs(event){
           // console.log(event)
            var body = document.body;
            var objDiv = document.createElement("div");
            // 设置离开菜单的时候菜单消失
            objDiv.addEventListener("mouseleave",function(event){
                body.removeChild(this);
            })
            objDiv.setAttribute("style",``);
            objDiv.style["position"] = "fixed";
            objDiv.style["display"] = "flex";
            objDiv.style["flex-direction"] = "column";
            objDiv.style["background"] = "white";
            
            objDiv.style["left"] = event.clientX + "px";
            objDiv.style["top"] = event.clientY  + "px"; 
            objDiv.style["width"] = "50px";

            for(var i = 1; i <= 6; i++) {
                var liObj = document.createElement("button");
                liObj.setAttribute("class",`g-mouseMoveOnNav-bgcolorGray g_btn`);
                liObj.setAttribute("style",'text-align: center;')
                liObj.setAttribute("onclick",`document.execCommand("formatBlock",false,"h"+${i})`)  // 只能通过这种形式添加，其它形式例如addEventlinsten则失效
                liObj.innerText = "H" + i;
                objDiv.appendChild(liObj);
            }
            body.appendChild(objDiv);
        },
        /**
         * 将数据传给父组件
         */
        putEditContent(){
            //console.log('子组件开始传值给父组件');
            let articleContent = document.getElementById('HpEdit_editContent').innerHTML;
            this.$emit('change', articleContent);                    // 父组件用v-modle来接收 所以事件要用input
        }
    }
}
</script>
<style >

/**隐藏颜色表 */
#HpEdit .input_type_color {
    opacity: 0;
    position: absolute;
    left: 0;
    top:10px;
    width: 20px;
}
#HpEdit{
    position: relative;
    background: white;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 600px; 
}

#HpEdit .HpEdit_editContent {
    overflow: auto;
}
#HpEdit .btn_wrapper {
    display: flex;
    flex-direction: row;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid rgba(146,146,146);
    justify-content: space-around;
    margin-bottom:20px ;
}
#HpEdit .HpEdit_editContent{
    box-shadow: 0px 15px 10px 10px rgb(146,146,146);
    flex:1;
    outline: none;
    padding: 10px;
}
</style>