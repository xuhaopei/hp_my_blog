import instance from './base.js'

import {validateLogin} from '@/utils/Validate.js'


/**
 * 提交一篇文章
 */
export function httpArticleAdd(pid, articleName, articleContent, author, tags, uid, articleHtml) {
    
    if(validateLogin() === false) return;
    
    let obj = {
        pid,
        articleName,
        articleContent,
        author,
        tags,
        uid,
        articleHtml
    };
    return instance.post(
        '/article/add',
        obj
    );
}
/**
 * 根据内容，分页查询多篇文章
 */
export function httpArticleQuery(content, start, end) {
    return instance.request({
        url: '/article/queryLike',
        method: 'get', // default
        params: {
            content:content,
            start:start,
            end:end,
        },
    });
}
/**
 * 根据内容和用户id，分页查询多篇文章
 */
 export function httpArticleQueryByUIdAndContent(uId,content, start, end) {
    return instance.request({
        url: '/article/queryLikeByUIdAndContent',
        method: 'get', // default
        params: {
            content:content,
            uId:uId,
            start:start,
            end:end,
        },
    });
}
/**
 * 查询一篇文章
 */
export function httpArticleQueryOne(id) {
    return instance.request({
        url: '/article/queryOne',
        method: 'get', // default
        params: {
            id: id
        },
    });
}

/**
 * 根据数组里面的id删除文章
 */
 export async function httpDeleteArticles(ids) {
    return instance.request({
        url: '/article/deleteMore',
        method: 'get', // default
        params: {
            ids: ids
        },
    });
}
/**
 * 修改文章
 */
 export function htttpUpdateArticle(id, articleName, articleContent, tags,articleHtml) {
    return instance.request({
        url: '/article/update',
        method: 'post', // default
        data: {
            id,
            articleName,
            articleContent,
            tags,
            articleHtml,
        },
    });
}