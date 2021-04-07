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
 * @param {Array} params 存储各个参数，格式如下。
 * @param {Number} id     目录ID
 * @param {String} path   目录路径
 * @param {String} name   目录名称
 * @param {Number} flag   0代表目录,其它数字代表文章
 */
export function updateDirectory(url,params) {
    let {id,path,name} =  params;
    //return instance.post(url,id,path,name);
    instance.post(url,params);
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
 * @param {Array} params 存储各个参数，格式如下。
 * @param {Number} pid  上级目录ID
 * @param {String} path 目录路径
 * @param {String} name 目录名称
 * @param {Number} articleId 0为目录，其它为文章id;
 */
export function createDirector(url,params) {
    return instance.post(url,params);
}

/**
 * 删除目录
 * @param {String} url 
 * @param {Array} params 存储各个参数，格式如下。
 * @param {Number} id   目录ID
 */
export function deleteDirector(url,params) {
    return instance.post(url,params);
}

/**
 * 创建目录
 * @param {Number} pid  上级目录ID
 * @param {String} path 目录路径
 * @param {String} name 目录名称
 * @param {Number} articleId 0为目录，其它为文章id;
 * @param {Number} uid 用户id;
 */
 export function httpCreateDirector(pid,path,name,articleId,uid) {
   let params = {pid,path,name,articleId,uid}
   return instance.post(
       `/directory/add`,
       params);
}

/**
 * 删除目录
 * @param {Number} id   目录ID
 */
 export function httpDeleteDirector(id) {
    return instance.get(
        `/director/delete?id=${id}`
    );
}

/**
 * 更新目录
 * @param {Number} id     目录ID
 * @param {String} path   目录路径
 * @param {String} name   目录名称
 */
 export function httpUpdateDirectory(id,path,name) {
    return instance.post(
        '/directory/update',
        {id,path,name}
    );
}

/**
 * 查询用户所有目录
 * @param {number} uid 用户id
 * 返回一个promise
 */
 export function httpGetDirectory(uid) {
    return instance.get(
        `/directory/queryAll?uid=${uid}`
    );
}