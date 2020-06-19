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
 * 更新目录
 * @param {String} url 
 * @param {Number} id     目录ID
 * @param {String} path   目录路径
 * @param {String} name   目录名称
 */
export function updateDirectory(url,id,path,name) {
    return instance.post(url,id,path,name);
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

/**
 * 创建目录
 * @param {String} url 
 * @param {Number} pid  上级目录ID
 * @param {String} path 目录路径
 * @param {String} name 目录名称
 */
export function createDirector(url,pid,path,name,articleId = 0) {
    let array = [pid,path,name,articleId]
    return instance.post(url,array);
}

/**
 * 删除目录
 * @param {String} url 
 * @param {Number} id   目录ID
 */
export function deleteDirector(url,id) {
    let array = [id]
    return instance.post(url,array);
}