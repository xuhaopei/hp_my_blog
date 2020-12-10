import instance from './base.js'

export function http_post_commitCalenderPlan(url,msg){
    return instance.post(url,msg);
}

export function http_get_getCalenderPlan(url,date){
    return instance.get(`${url}?date=${date}`);
}