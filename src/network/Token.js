import instance from './base.js'


/**
 * 自定义请求头，设置token
 * @param {String} token 
 */
export function setHeaderToken(token){
    instance.defaults.headers['token'] = token;  // 自定义请求头
}

/**
 * 自定义请求头，将token设置为''
 */
export function clearHeaderToken(){
    instance.defaults.headers['token'] = '';
}