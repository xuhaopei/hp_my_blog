export function Tip(status) {
    let msg;
    let color;
    let oldTipWrapper = document.getElementById('hpTip');
    if(oldTipWrapper){
        return;
    }

    switch (status) {
        case 200:
        msg = '数据获取成功，且被缓存';
            color = 'rgba(90, 247, 111, 0.8)';
            break;
            case 201:
            msg = '数据已经被成功处理，且创建了新的资源';
            color = 'rgba(90, 247, 111, 0.8)' 
            break;
            case 202:
            msg = '服务器已收到该请求，但是还没有处理';
            color = 'rgba(90, 247, 111, 0.8)' 
            break;
            case 204:
            msg = '该请求已经成功了，但是客户端客户不需要离开当前页面';
            color = 'rgba(90, 247, 111, 0.8)' 
            break;
        case 400:
            msg = '您的语法错误，服务器无法理解此请求';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 401:
            msg = '您的身份登记已无效，请您登录。';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 403:
            msg = '服务器拒绝了您这次请求';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 404:
            msg = '服务器找不到您所要的资源';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 500:
            msg = '服务器内部出现bug了，不好意思';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 501:
            msg = '您的请求方法服务器不支持哦，因此没有处理';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        case 502:
            msg = '网关问题';
            color = 'rgba(247, 90, 90, 0.8)'
            break;
        default:
            msg = '时间超时';
            color = 'rgba(247, 90, 90, 0.8)';
    }

    let tipWrapper = document.createElement('div');
    tipWrapper.setAttribute('id','hpTip');
    tipWrapper.setAttribute('style',`
        box-shadow: 0 0 3px 3px rgba(247, 90, 90, 0.8);
        margin: 5px;
        width: 240px;
        height: 120px;
        position: fixed;
        right: -250px;
        top: 0;
        transition:right 1s ease-in-out;
        background:white;        
    `);
    tipWrapper.style['box-shadow'] = '0 0 3px 3px ' + color;
    tipWrapper.style['color']  = color;
    
    // 异步启动动画
    setTimeout(()=>{
        tipWrapper.style['right']  = '0px';
    },100)

    // 动画完成后在1.5S后去除这个动画
    tipWrapper.addEventListener('transitionend',()=>{
        setTimeout(()=>{
        document.body.removeChild(tipWrapper)
        },1500)
    })   
      
    let tipTitle = document.createElement('div');
    tipTitle.setAttribute('style',`
        border-bottom: 1px solid rgba(247, 90, 90, 0.8);
        padding: 5px;
    `);
    tipTitle.style['border-bottom'] = '1px solid ' + color;
    tipTitle.innerText = '温习提示';

    let tipContent = document.createElement('div');
    tipContent.setAttribute('style',`
        padding: 5px;
        font-size:13px;
    `);
    tipContent.innerText = msg;

    tipWrapper.appendChild(tipTitle);
    tipWrapper.appendChild(tipContent);
    document.body.appendChild(tipWrapper);
    
}