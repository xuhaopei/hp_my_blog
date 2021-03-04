import instance from './base.js'

/**
 * 登录用户
 * @param {*} url 接口路径
 * @param {*} paramaObj  {username:'xhp',password:'123456'} 传递的参数
 */
export function doLogin(url,paramaObj) {
    async function test(paramaObj){
        return await new Promise((resovle,reject)=>{
            setTimeout(()=>{
                resovle({
                    name:'许浩培',
                    school:'广东技术师范大学',
                    college:'计算机科学学院',
                    major:'软件技术',
                    class:'大三',
                    email: '986119817@qq.com',
                    password: 'zxcasd',
                    token:'zxcasd'
                });
            },1000)
        })
    }
    return test(paramaObj);
    //return instance.post(url,paramaObj);
}

