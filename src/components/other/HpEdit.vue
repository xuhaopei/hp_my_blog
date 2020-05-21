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
            <button class="iconfont icon-baojiaquotation2 g-navHref g_cancleBtn" name="edit-action" title="双引号" edit-action="insertHTML" edit-action-value="&#8243;" ></button>
            <button class="iconfont icon-h g-navHref g_cancleBtn" name="edit-action" title="标题" edit-action="formatBlock" edit-action-value="h1"></button>
            <button class="iconfont icon-H g-navHref g_cancleBtn" name="edit-action" title="标题列表" edit-action="hs" v-on:mouseover="createHs"></button>
            <button class="iconfont icon-yueduye_zitizengda g-navHref g_cancleBtn" name="edit-action" title="加大" edit-action="fontsize" edit-action-value="1"></button>
            <button class="iconfont icon-yueduye_zitijianxiao g-navHref g_cancleBtn" name="edit-action" title="减小" edit-action="fontsize" edit-action-value="-1"></button>
            <div class="iconfont icon-A g-navHref g_cancleBtn" style="position:relative"><input class="input_type_color" name="edit-action" title="字体颜色" edit-action="foreColor" type="color"/></div>
            <div class="iconfont icon-a  g-navHref g_cancleBtn" style="position:relative"><input class="input_type_color" name="edit-action" title="背景颜色" edit-action="backColor" type="color"/> </div>
            <div class="iconfont icon-tupian g-navHref g_cancleBtn" style="position:relative"><input class="input_type_color" name="edit-action" title="插入图片" edit-action="insertImage" type="file"/> </div>
        </div>
        <div class="HpEdit_editContent" contenteditable="true">
            &#8243;1&#8243;
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
            var btns = document.getElementsByName('edit-action');
            var that = this;
            for(var i = 0; i < btns.length; i++){
                btns[i].onclick = function(){
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
                                var src = this.value.replace(/\\/g,"/");
                                console.log(src)
                                document.execCommand('insertHTML', false, '<img src="' + src + '" width=500 height=500>');
                            },false);
                        default :
                            document.execCommand(this.getAttribute('edit-action'),false,this.getAttribute('edit-action-value'));    
                    }
                    

                    
                }
            }
        },
        /**
         * 创建可视化标签 
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
            //objDiv.style["left"] = event.offsetLeft + 70 + "px";
            //objDiv.style["top"] = event.offsetTop + 20 + "px"; 
            
            objDiv.style["left"] = event.clientX + "px";
            objDiv.style["top"] = event.clientY  + "px"; 
            objDiv.style["width"] = "50px";

            for(var i = 1; i <= 6; i++) {
                var liObj = document.createElement("button");
                liObj.setAttribute("class",`g-mouseMoveOnNav-bgcolorGray`);
                liObj.setAttribute("style",'text-align: center;')
                liObj.innerText = "H" + i;
                liObj.addEventListener('mouseover',function(){
                    console.log(document.execCommand("formatBlock",false,"h"+i));  
                },false);
                objDiv.appendChild(liObj);
            }
            body.appendChild(objDiv);
        }
    }
}
</script>
<style >
#HpEdit .input_type_color {
    opacity: 0;
    position: absolute;
    left: 0;
    top:0 ;
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
    height: 100%;
    
    
}
#HpEdit .input_Wrapper {
    height: 40px;
    text-indent: 10px;
    outline: none;
    border: 0;
}
#HpEdit .i_wrapper {
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