import instance from './base.js'

import {
    validateLogin
} from '@/utils/Validate.js'
import {
    Message
} from 'element-ui';

/**
 * 提交一篇文章
 */
export async function httpArticleAdd(pid, articleName, articleContent, author, tags, uid, articleHtml) {

    // if (validateLogin() === false) return;

    let msg = {};
    try {
        if (validateLogin() === false) throw new Error("请您登录");

        let {
            data
        } = await instance.request({
            url: '/article/add',
            method: 'post', // default
            data: {
                pid,
                articleName,
                articleContent,
                author,
                tags,
                uid,
                articleHtml
            },
        });
        msg = data;
        Message({
            showClose: true,
            message: "笔记添加成功！",
            type: 'success',
        });
    } catch (error) {
        Message({
            showClose: true,
            message: error,
            type: 'error',
        });
    }

    return msg;
}
/**
 * 根据内容，分页查询多篇文章
 */
export function httpArticleQuery(content, start, end) {
    return instance.request({
        url: '/article/queryLike',
        method: 'get', // default
        params: {
            content: content,
            start: start,
            end: end,
        },
    });
}

/**
 * 根据内容，查询文章总数量
 */
export async function httpArticleQuerySum(content) {
    let msg = {};
    try {
        let {
            data
        } = await instance.request({
            url: '/article/queryLikeSum',
            method: 'get', // default
            params: {
                content: content,
            },
        });
        msg = data;
    } catch {

    }

    return msg;

}
/**
 * 根据内容和用户id，分页查询多篇文章
 */
export function httpArticleQueryByUIdAndContent(uId, content, start, end) {
    return instance.request({
        url: '/article/queryLikeByUIdAndContent',
        method: 'get', // default
        params: {
            content: content,
            uId: uId,
            start: start,
            end: end,
        },
    });
}
/**
 * 根据内容和用户id，查询文章总数量
 */
export async function httpArticleQueryByUIdAndContentSum(content,uId) {
    let msg = {};
    try {
        let {
            data
        } = await instance.request({
            url: '/article/queryLikeByUIdAndContentSum',
            method: 'get', // default
            params: {
                content: content,
                uId: uId,
            },
        });
        msg = data;
    } catch (error) {
        Message({
            showClose: true,
            message: error,
            type: 'error',
        });
    }

    return msg;

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
export function htttpUpdateArticle(id, articleName, articleContent, tags, articleHtml) {
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
/**
 * 点赞文章
 */
export function htttpUpdateArticleGood(id) {
    return instance.request({
        url: '/article/updateGood',
        method: 'get', // default
        params: {
            id,
        },
    });
}

/**
 * 修改文章审核
 */
export function htttpUpdateArticleCanCross(ids, num) {
    return instance.request({
        url: '/article/updateCanCross',
        method: 'post', // default
        data: {
            ids,
            num
        },
    });
}