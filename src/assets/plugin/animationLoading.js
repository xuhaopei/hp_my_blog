// 导出一个对象，该对象必须有install(Vue,options)方法,VUE官方规定使用自定义的插件必须有installf方法
export default {
    install(Vue, options){

        Vue.prototype.$animation = {
            createLoading(){

                /*设置画布的容器*/
                let svgWrapper = document.createElement('div');
                svgWrapper.setAttribute('id','hp_svgWrapper');
                svgWrapper.setAttribute('style',`
                position: fixed;
                left:0;
                top:0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.1);
                `)
            
                /*设置画布*/
                let svg = document.createElementNS('http://www.w3.org/2000/svg','svg');         // 只能通过这种方式创建svg
                svg.setAttribute('viewBox','0 0 200 100');
                svg.setAttribute('style','transform:scale(0.5)');
                /*设置圆*/
                let circle = document.createElementNS('http://www.w3.org/2000/svg','circle');   // 只能通过这种方式创建circle
                circle.setAttribute('cx','100');
                circle.setAttribute('cy','50');
                circle.setAttribute('r','10');
                circle.setAttribute('style',`
                    fill: none;                     /*设置圆的背景颜色为空*/
                    stroke:#000;                    /*设置圆边框为黑色*/
                    stroke-width:1px;               /*设置圆边框粗度为2*/
                    stroke-dasharray: 63,63;        /*设置圆边框为虚线，此时虚线长度为63 间隔为63 一直循环*/
                    stroke-dashoffset: 0;           /*设置圆边框虚线移动0*/
                    transform-origin:center center ;
                    stroke-linecap:round;           /*设置圆边框的端点为圆形*/
                    animation: hp_rotate 0.8s linear infinite,hp_stroke 3.2s linear infinite;
                `)
            
                svg.appendChild(circle);
                svgWrapper.appendChild(svg);
                document.body.appendChild(svgWrapper);
            
            
                /*设置圆的动画规则,如果存在说明已经制定规则了，无需再添加规则*/
                let hp_loading = document.getElementById('hp_loading');
                if(hp_loading) {
                    return;
                }
                else {
                    let style = document.createElement('style');
                    style.setAttribute('type','text/css');
                    style.setAttribute('id','hp_loading')
                    document.head.appendChild(style);
                    let sheet = style.sheet;                                           // 获取style表格 方便插入动画规则
                    sheet.insertRule(`
                    @keyframes hp_rotate {
                            0%{
                                transform: rotate(0deg);
                            }
                            100%{
                                transform: rotate(360deg);
                            }
                        }
                    `)
                    sheet.insertRule(`
                    @keyframes hp_stroke {
                            0%{
                                stroke-dashoffset: 0;      
                            }
                            50%{
                                stroke-dashoffset: 63;           /*设置虚线向左移动63*/
                            }
                            100%{
                                stroke-dashoffset: 126;         /*设置虚线向左移动126*/
                            }
                    }
                    `)
                }        
            },
            cancelLoading(){
                let loadingObj = document.getElementById('hp_svgWrapper');
                document.body.removeChild(loadingObj)
            }
        }
    }
}