import instance from './base.js'

/**
 * 将计划表数据发送给服务器
 */
export function http_post_commitCalenderPlan({allFinish,gridData,date}){
    return instance.request({
        url: '/calenderplan/add',
        method: 'post', // default
        data: {
            allFinish,
            date,
            gridData,
        },
    });
}

/**
 * 根据计划标题请求该天的数据。
 */
export function http_get_getCalenderPlan(date){
    return instance.request({
        url: '/calenderplan/queryOne',
        method: 'get', // default
        params: {
            date: date
        },
    });
}

/**
 * 根据计划标题请求该天的数据。
 */
 export function http_get_updateCalenderPlan({id,allFinish,gridData,date}){
    return instance.request({
        url: '/calenderplan/update',
        method: 'post', // default
        data: {
            id,id,
            allFinish:allFinish,
            gridData: gridData,
            date:date,
        },
    });
}