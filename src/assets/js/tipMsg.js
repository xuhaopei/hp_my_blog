
import { Message } from 'element-ui';


export function Tip(Obj, flage = true) {

    if(Obj === undefined) {
        return Message({
            showClose: true,
            message: '请求超时，请重新请求数据',
            type: 'error'
        })
    }
    let msg;
    let status = Obj.status;                   // 获取响应状态码     
    let type = flage ? 'success':'error';                    // 设置显示状态

    switch (status) {
        case 200:
            msg = '操作成功';
            break;
        case 201:
            msg = '';
            break;
        case 202:
            msg = '服务器已收到该请求，但是还没有处理';
            break;
        case 204:
            msg = '该请求已经成功了，但是客户端客户不需要离开当前页面';
            break;
        case 400:
            msg = '您的语法错误，服务器无法理解此请求' + Obj.data;
            break;
        case 401:
            msg = '此操作需要权限。您的身份登记已无效，请您登录。'+ Obj.data;
            break;
        case 403:
            msg = '服务器拒绝了您这次请求,'+ Obj.data;
            break;
        case 404:
            msg = '服务器找不到您所要的资源,'+ Obj.data;
            break;
        case 500:
            msg = '服务器内部出现bug了,'+ Obj.data;
            break;
        case 501:
            msg = '您的请求方法服务器不支持哦，因此没有处理'+ Obj.data;
            break;
        case 502:
            msg = '网关问题'+ Obj.data;
            break;
        default:
            msg = '，时间超时'+ Obj.data;
    }

    Message({
        showClose: true,
        message: msg,
        type: type
    });

}