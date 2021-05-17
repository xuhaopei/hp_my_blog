/**
 * 将字符串里面的key内容转变成带有span标签的key内容。
 * @param {*} Str 
 */
 export function strKeyToSpan(str,key){
    let strHtml = str;
    let reg = new RegExp(`${key}`,`ig`);
    if(typeof str === 'string') {
        strHtml = str.replace(reg,`<span style="color: red;">${key}</span>`);
    } 
    return strHtml;
}