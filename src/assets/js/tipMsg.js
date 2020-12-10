
import { Message } from 'element-ui';
import routerApi from '@/network/baseRouter';


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
    let url = Obj.config.url;               // 获取请求的路径 
    let type = 'success';                    // 设置显示状态
    // 针对get请求 做处理
    let length = url.indexOf('?');
    url = (length == -1) ? url : url.substring(0, length);  // 截取?字符前面的字符串

    switch (status) {
        case 200:
            msg = '';
            break;
        case 201:
            msg = '';
            break;
        case 202:
            msg = '，服务器已收到该请求，但是还没有处理';
            break;
        case 204:
            msg = '，该请求已经成功了，但是客户端客户不需要离开当前页面';
            break;
        case 400:
            msg = '，您的语法错误，服务器无法理解此请求';
            break;
        case 401:
            msg = '，此操作需要权限。您的身份登记已无效，请您登录。';
            break;
        case 403:
            msg = '，服务器拒绝了您这次请求,不好意思，暂时不支持此项操作。';
            break;
        case 404:
            msg = '，服务器找不到您所要的资源';
            break;
        case 500:
            msg = '，服务器内部出现bug了，不好意思';
            break;
        case 501:
            msg = '，您的请求方法服务器不支持哦，因此没有处理';
            break;
        case 502:
            msg = '，网关问题';
            break;
        default:
            msg = '，时间超时';
    }

    switch (url) {

        /**对文章操作的API */
        case routerApi.articleServilce.add:

            msg = flage ? '文章添加成功！' : '文章添加失败' + msg;

            type = flage ? 'success' : 'error';
            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;
        case routerApi.articleServilce.find:

            msg = flage ? '文章查找成功！' : '文章查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;
        case routerApi.articleServilce.findAll:

            msg = flage ? '文章查找成功！' : '文章查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;
        case routerApi.articleServilce.findLike:

            msg = flage ? '文章查找成功！' : '文章查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;
        case routerApi.articleServilce.findNear:

            msg = flage ? '文章查找成功！' : '文章查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;

        case routerApi.articleServilce.findLikeSum:
            msg = flage ? '文章数量查找成功！' : '文章数量查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }
            break;    
        case routerApi.articleServilce.findSome:

            msg = flage ? '文章查找成功！' : '文章查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;
        case routerApi.articleServilce.findSum:
            msg = flage ? '文章查找成功！' : '文章数量查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }
            break;
        case routerApi.articleServilce.update:
            msg = flage ? '文章修改成功！' : '文章修改失败' + msg;

            type = flage ? 'success' : 'error';

            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;
        case routerApi.articleServilce.updateRead:
            msg = flage ? '文章阅读数更新成功！' : '文章阅读数更新失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }
            break;
        case routerApi.articleServilce.delete:
            msg = flage ? '文章删除成功！' : '文章删除失败' + msg;

            type = flage ? 'success' : 'error';

            Message({
                showClose: true,
                message: msg,
                type: type
            });
            break;

        /**对目录操作的API */
        case routerApi.directoryService.add:

            msg = flage ? '目录添加成功！' : '目录添加失败' + msg;

            type = flage ? 'success' : 'error';
            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;
        case routerApi.directoryService.findAll:
            msg = flage ? '目录查找成功！' : '目录查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }
            break;
        case routerApi.directoryService.update:
            msg = flage ? '目录修改成功！' : '目录修改失败' + msg;

            type = flage ? 'success' : 'error';

            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;
        case routerApi.directoryService.delete:
            msg = flage ? '目录删除成功！' : '目录删除失败' + msg;

            type = flage ? 'success' : 'error';

            Message({
                showClose: true,
                message: msg,
                type: type
            });
            break;

        /**对用户操作的API */
        case routerApi.userService.add:

            msg = flage ? '用户添加成功！' : '用户添加失败' + msg;

            type = flage ? 'success' : 'error';
            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;
        case routerApi.userService.find:

            msg = flage ? '用户查找成功！' : '用户查找失败' + msg;

            type = flage ? 'success' : 'error';

            // 失败就弹出窗口
            if (!flage) {
                Message({
                    showClose: true,
                    message: msg,
                    type: type
                });
            }

            break;
        
        /**对文件操作的API */
        case routerApi.files.uploadImage:
            msg = '';
            break;
        case routerApi.files.uploadFile:
            msg = '';
            break;

        /**对日历计事表的API */
        case routerApi.calenderService.commit:
            
            msg = flage ? '日历计划表编辑成功！' : '日历计划表编辑失败' + msg;

            type = flage ? 'success' : 'error';
            Message({
                showClose: true,
                message: msg,
                type: type
            });

            break;

        case routerApi.calenderService.getCalender:
             msg = '';
             break;
            
        default:
            msg = '此操作未被前端记录！' + url;
            type = "error";
            Message({
                showClose: true,
                message: msg,
                type: type
            });
    }

}