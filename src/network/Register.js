import instance from './base.js'

/**
 * 注册用户
 * @param {*} url 接口路径
 * @param {*} paramaObj 传递的参数
 * {email:'986119817@qq.com',password:'12345678'}
 */
export function doRegister(url,paramaObj) {
    return instance.post(url,paramaObj);
}
