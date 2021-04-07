import instance from './base.js'

import {validateLogin} from '@/utils/Validate.js'
import { Message } from 'element-ui';

/**
 * 提交一则消息
 */
export function httpCommentAdd(aId,uId,userName,content,path,pId) {
    
    if(validateLogin() === false) {
        Message({
            message: "请您登录",
            type: 'error'
        });
        return Promise.reject();
    };
    
    return instance.request({
        url: '/comment/add',
        method: 'post', // default
        data: {
            aId,uId,userName,content,path,pId
        },
    });
}


/**
 * 根据文章ID获取所有消息
 */
 export function httpCommentQuery(aId) {
    
    return instance.request({
        url: '/comment/queryAll',
        method: 'get', // default
        params: {
            aId:aId
        },
    });
}
