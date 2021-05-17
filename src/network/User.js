import instance from './base.js'

/**
 * 注册用户
 * @param {*} paramaObj 传递的参数
 * {email:'986119817@qq.com',password:'123456'}
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

/**
 * 分页查询用户
 */
export function httpUserQueryMore(start, end) {
    return instance.request({
        url: '/user/queryMore',
        method: 'get', // default
        params: {
            start: start,
            end: end,
        },
    });
}
/**
 * 查询用户
 */
export function httpUserQuery(id) {
    return instance.request({
        url: '/user/queryOne',
        method: 'get', // default
        params: {
            id
        },
    });
}
/**
 * 删除用户
 */
 export function httpUserDelete(ids) {
    return instance.request({
        url: '/user/delete',
        method: 'post', // default
        data: {
            ids
        },
    });
}
/**
 * 修改用户
 */
 export function httpUserUpdate(id,data) {
    return instance.request({
        url: '/user/alertAll',
        method: 'post', // default
        data: {
            id,
            data
        },
    });
}