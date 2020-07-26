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
 * 模糊查询文章的标题，标签，文章内容。
 * @param {*} url 
 * @param {*} content 
 */
export function searchArticle(url,content) {
    return instance.get(url+'?content='+content);
}
/**
 * 
 * @param {String} url 
 * @param {Number} pid 
 * @param {String} articleName 
 * @param {String} articleContent 
 * @param {String} author 
 * @param {String} tags 
 * @param {String} articleContentText   文章text内容
 */
export function putArticle(url,pid,articleName,articleContent,author,tags,articleContentText) {
    let array = [pid,articleName,articleContent,author,tags,articleContentText];
    return instance.post(url,array);
}

/**
 * 根据文章ID查询一篇文章
 * @param {String} url 
 * @param {Number} id 文章ID
 */
export function getArticle(url,id) {
    return instance.get(url+'?id='+id);
}

/**
 * 根据页码查询一些文章
 * @param {String} url 
 * @param {Number} pageId   页码
 * @param {Number} pageSize 一页的数量
 */
export function getSomeArticle(url,pageId=1,pageSize=7) {
    return instance.get(`${url}?pageId=${pageId}&pageSize=${pageSize}`);
}

/**
 * 查询所有文章
 * @param {*} url 
 */
export function getAllArticle(url) {
    return instance.get(url);
}

/**
 * 查询文章的总数量
 * @param {*} url 
 */
export function getAllArticleNumber(url) {
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
 * @param {String} articleId            文章ID
 * @param {String} articleName          文章名
 * @param {String} articleContent       文章HTML内容
 * @param {String} tags                 文章标签
 * @param {String} articleContentText   文章text内容
 */
export function updateArticle(url,id,articleName,articleContent,tags,articleContentText) {
    let array = [id,articleName,articleContent,tags,articleContentText];
    return instance.post(url,array);
}