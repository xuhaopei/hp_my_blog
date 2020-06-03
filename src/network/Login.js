import instance from './base.js'

/**
 * 注册用户
 * @param {*} url 接口路径
 * @param {*} paramaObj 传递的参数
 */
export function doLogin(url,paramaObj = {username:'xhp',password:'123456'}) {
    return instance.post(url,paramaObj);
}

/**
 * 给axios设置token 方便服务器验证
 * @param {*} cookie  
 */
export function setHeaderCookie(cookie){
    instance.headers = {
        'cookie':cookie
    }
}
