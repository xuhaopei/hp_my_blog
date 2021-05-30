// 给元素数组添加id 返回对应id名与innerText。
export function domHandle_setId(eleArray) {
    let index = 0;
    let ids = [];
    eleArray.forEach(element => {
        let obj = {
            idName: '',
            innerText: ''
        };
        obj.idName = 'nav' + index;
        obj.innerText = element.innerText;
        element.setAttribute("id", obj.idName);
        ids.push(obj);
        index++;
    });
    return ids;

}

// 返回元素数组标签内容
export function domHandle_getContent(eleArray) {
    let contents = [];
    eleArray.forEach(element => {
        ids.push(element.innerText);
    });
    return contents;
}

// 当页面没有滚动条的时候，元素位置在距离页面顶端hegiht距离，当页面有滚动条的时候，元素位置黏贴在页面顶端。
export function domHandle_changePosition(ele, height) {
    const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; //兼容不同的浏览器

    if (top > height) {
        ele.style["top"] = 0;
    } else {
        let h = height - top;
        ele.style["top"] = h + "px";
    }
}

// 返回元素里面所有的h标签
export function domHandle_getHs(ele) {
    let hsArray = [];

    if (ele == null) return hsArray;
    let sons = ele.getElementsByTagName("*");

    sons.forEach((element) => {
        let tagName = element.nodeName;
        if (tagName[0] === "H") {
            hsArray.push(element);
        }
    });
    return hsArray;

}