import instance from './base.js'

/**
 * 将计划表数据发送给服务器
 * @param {*} url 
 * @param {*} msg 
 * {
 * id:Number                // 一条日历计划的ID,
 * date:String              // 计划标题,
 * allFinish:Number         // 计划是否完成,
 * gridData:Array           // 计划数组
 * }
 */
export function http_post_commitCalenderPlan(url,msg){
    return instance.post(url,msg);
}

/**
 * 根据计划标题请求该天的数据。
 * @param {*} url 
 * @param {*} date 
 * date:String              // 计划标题
 */
export function http_get_getCalenderPlan(url,date){
    return instance.get(`${url}?date=${date}`);
}