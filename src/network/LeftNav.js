import instance from './base.js'

/**
 * 查询所有目录
 * @param {String} url 接口路径
 * 返回一个promise
 */
export function getDirectory(url) {
    return instance.get(url);
}
/**
 * 根据title更新目录
 * @param {*} url 
 * @param {*} title 目录的名字 比如学习区
 * @param {*} directoryObj 一整个目录 比如{title:'学习区',smaillitems:[]}
 */
export function updateDirectory(url,title,directoryObj) {
    return instance.post(url,title,directoryObj);
}

/**
 * 提交一篇文章
 * @param {String} url 
 * @param {String} articleId  文章ID
 * @param {String} articleName  文章名
 * @param {String} articleContent 文章内容
 */
export function putArticle(url,articleId,articleName,articleContent) {
    return instance.post(url,articleId,articleName,articleContent);
}