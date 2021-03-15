import instance from './base.js'

/**
 * 注册用户
 * @param {*} paramaObj 传递的参数
 * {email:'986119817@qq.com',password:'12345678'}
 */
 export function httpRegister(paramaObj) {
    return instance.post(
        '/user/register',
        paramaObj
        );
}

/**
 * 登录用户
 * @param {*} paramaObj 传递的参数
 * {email:'986119817@qq.com',password:'12345678'}
 */
 export function httpLogin(paramaObj) {
    return instance.post(
        '/user/login',
        paramaObj
        );
}