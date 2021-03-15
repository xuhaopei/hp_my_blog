export let throttle = {
    // 保留函数指针，方便window销毁监听
    saveFn:null,
    // 基础的节流函数
    baseFn(callback_Promise,time){
        let timer = null;
        return function(){
            if(timer != null) return;
            timer =  setTimeout(async () => {
                await callback_Promise();   // 等待执行返回结果之后才可以继续触发callback_Promise函数
                timer = null;
            }, time);
        }
    },
    // 滚动若向下且超过之前的位置，则执行回调函数。
    scrool(callback_Promise){
        let pre = 0;
        return function(){
            if(document.documentElement.scrollTop - pre >= 0) {
                pre = document.documentElement.scrollTop;
                // 这里-100 有个 大学问，避免滚动条触底后一直触发节流函数。
                document.documentElement.scrollTop -= 100;
                return callback_Promise();
            }
        }
    },
    // 执行动态加载函数。
    scroolRun(time,callback_Promise){
        this.saveFn = this.baseFn(this.scrool(callback_Promise),time);  // 保留函数指针，方便window销毁监听
        window.addEventListener('scroll',this.saveFn,false);
    },
    // 清除滚动监听
    removeScrool(){
        window.removeEventListener('scroll',this.saveFn);
    }
}