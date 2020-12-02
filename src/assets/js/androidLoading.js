

class AndroidLoading {
    constructor(){
        this.el;
        this.svgWrapper;
        this.svg;
        this.styleEle;
        this.haveSetColors = new Set();
    }
    init(el){
        if(el.style.position =='') el.style.position = 'relative';  // 定位布局
        this.el = el;
        this.createSvgWrapper();
        this.createSvg();
        this.createStyle();
        this.svgWrapper.appendChild(this.svg);
        el.appendChild(this.svgWrapper);
    }
    addCircle(size, speed, color1, color2) {
       let circle = this.createCircle();
       this.setCircleSize(circle, size);
       this.setCircleAnimation(circle, speed, color1, color2)
       this.svg.appendChild(circle)
    }
    stop(){
        this.el.removeChild(this.svgWrapper);
    }
    // 定义为私有原型方法
    createSvgWrapper(){
        /*设置画布的容器*/
        let svgWrapper = document.createElement('div');
        svgWrapper.setAttribute('style', `
            position: fixed;
            left:0;
            top:0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.1);
        `)
        this.svgWrapper = svgWrapper;
    }
    createSvg(){
        /*设置画布*/
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');         // 只能通过这种方式创建svg
        svg.setAttribute('viewBox', '0 0 200 100');
        this.svg = svg;
    }
    createCircle(){

        /*设置圆*/
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');   // 只能通过这种方式创建circle
        circle.setAttribute('cx', '100');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '1');
        circle.setAttribute('style', `
            fill: none;                     /*设置圆的背景颜色为空*/
            stroke:#000;                    /*设置圆边框为黑色*/
            stroke-width:1px;               /*设置圆边框粗度为2*/
            stroke-dasharray: 63,63;        /*设置圆边框为虚线，此时虚线长度为63 间隔为63 一直循环*/
            stroke-dashoffset: 0;           /*设置圆边框虚线移动0*/
            transform-origin:center center ;
            stroke-linecap:round;           /*设置圆边框的端点为圆形*/
        `)
        return circle;
        }
    createStyle(){
        let style = document.getElementsByTagName('style')[0];
            /*设置style的init*/
        if (!style) {
            style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            document.head.appendChild(style);
        }
        // 插入转圈圈动画
        style.sheet.insertRule(`
            @keyframes hp_rotate {
                    0%{
                        transform: rotate(0deg);
                    }
                    100%{
                        transform: rotate(360deg);
                    }
                }
        `);
        style.sheet.insertRule(`
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
        `);
        this.styleEle = style;

    }
    setCircleSize(cirlce, size) {
        cirlce.setAttribute('r', size);
    }
    setCircleAnimation(circle, speed, color1, color2) {

        circle.setAttribute('style', `${circle.getAttribute('style')}
            animation: hp_rotate ${speed}s linear infinite,hp_stroke ${speed*4}s linear infinite,hp_${color1 + color2} 3.2s linear infinite;
        `)

        this.insertKeyFrameRuleAboutCircleColor(color1, color2)

    }
    insertKeyFrameRuleAboutCircleColor(color1, color2){
        if(this.haveSetColors.has(color1+color2)) {
            return;
        } 
        this.haveSetColors.add(color1+color2)
        this.styleEle || this.createStyle();

        this.styleEle.sheet.insertRule(`
                @keyframes hp_${color1 + color2} {
                        0%{
                            stroke:#${color1};
                        }
                        50%{
                            stroke:#${color2};
                        }
                        100%{
                            stroke:#${color1};
                        }                        
                    }
        `); 
    }
}

let androidLoading = null;
let httpsNum = 0; // 腾讯大佬牛批！计算每个http 确保最后http请求结果返回后动画才停止。
export function createLoading(){
    httpsNum++;
    if(androidLoading == null) {
        androidLoading = new AndroidLoading();
        androidLoading.init(document.body);
        androidLoading.addCircle(20, 0.8, 'fcc5e4', '020f75')
        androidLoading.addCircle(15, 0.6, '4fb576', '432c39')
        androidLoading.addCircle(10, 0.5, 'ed6ea0', 'ec8c69')
    }
}

export function cancelLoading(){
    httpsNum--;
    if(androidLoading != null && httpsNum == 0 ) {
        androidLoading.stop();
        androidLoading = null;
    }
}
