
/**
 * 将dom元素里面的H元素解析出来。
 * @param {dom} ele 
 * @return {Array} [{tag:'', content:''}]
 */
export function ParseArticleContentToHs(ele) {
    /**获取ele元素里面的h标签 */
    if(ele == null) return [];
    let sons = ele.getElementsByTagName("*");
    let hsArray = [];
    sons.forEach((element) => {
      let tagName = element.nodeName;
      if (tagName[0] === "H") {
        let obj = {            
          tag:'',
          content:''
        };
        obj.tag = tagName;
        obj.content = element.innerText;
        hsArray.push(obj);
      }
    });

    return hsArray;
}
