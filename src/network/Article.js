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
    let array = [title,directoryObj];
    return instance.post(url,array);
}

/**
 * 提交一篇文章
 * @param {String} url 
 * @param {String} articleId  文章ID
 * @param {String} articleName  文章名
 * @param {String} articleContent 文章内容
 * @param {String} zone         文章所属区域
 * @param {String} articleAuthor         文章作者
 */
export function putArticle(url,articleId,articleName,articleContent,zone,articleAuthor) {
    let array = [articleId,articleName,articleContent,zone,articleAuthor];
    return instance.post(url,array);
}

/**
 * 根据文章ID查询一篇文章
 * @param {*} url 
 * @param {*} articleId 文章ID
 */
export function getArticle(url,articleId) {
    return instance.get(url+'?articleId='+articleId);
}

/**
 * 查询所有文章
 * @param {*} url 
 * @param {*} articleId 文章ID
 */
export function getAllArticle(url) {
    return instance.get(url);
}

/**
 * 根据文章ID删除一篇文章
 * @param {*} url 
 * @param {*} articleId 文章ID
 */
export function deleteArticle(url,articleId) {
    return instance.get(url+'?articleId='+articleId);
}
/**
 * 
 * @param {*} url 
 * @param {String} articleId  文章ID
 * @param {String} articleName  文章名
 * @param {String} articleContent 文章内容
 * @param {String} zone         文章所属区域
 * @param {String} articleAuthor         文章作者
 */
export function updateArticle(url,articleId,articleName,articleContent,zone,articleAuthor) {
    let array = [articleId,articleName,articleContent,zone,articleAuthor];
    return instance.post(url,array);
}