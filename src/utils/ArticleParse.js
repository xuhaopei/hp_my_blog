/**
 * 将文章里面的H元素解析出来。
 * @param {*} str 
 * @return {Array} [{tag:'', content:''}]
 */
export function ParseArticleContentToHs(str) {
    if(typeof str !== "string") return [];
    let regStart = /\<h\d\>/g;
    let regEnd = /\<\/h\d\>/g;
    let result = [];
    while(str != '') {
        let obj = {
            tag:'',
            content:''
        }
        let start = str.search(regStart);
        let end = str.search(regEnd);
        if(start === -1 || end === -1) break;

        obj.tag = str.slice(start + 1, start + 3);
        obj.content = str.slice(start + 4, end);

        result.push(obj);
        end += 5;
        str = str.substr(end);
    }
    return result;
}

/**
 * 将dom元素里面的h标签都设置index
 * @param {dom} ele 
 */
export function ParseArticleContentToSetHsId(ele) {
    /**获取ele元素里面的h标签 */
    if(ele == null) return;
    let sons = ele.getElementsByTagName("*");
    let hsArray = [];
    sons.forEach((element) => {
      let tagName = element.nodeName;
      if (tagName[0] === "H") {
        hsArray.push(element);
      }
    });
}