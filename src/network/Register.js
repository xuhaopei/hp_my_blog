import instance from './base.js'

/**
 * 注册用户
 * @param {*} url 接口路径
 * @param {*} paramaObj 传递的参数
 */
export function doRegister(url,paramaObj = {username:'xhp',password:'123456',email:'986119817@qq.com'}) {
    return instance.post(url,paramaObj);
}

export function doQuery(url) {
    return instance.get(url);
}