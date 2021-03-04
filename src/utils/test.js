/**
 * 将文章里面的H元素解析出来。
 * @param {*} str 
 * @return {Array} [{tag:'', content:''}]
 */
function ParseArticleContentToHs(str) {
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
        //obj.content = str.slice(start + 4, end);
        

        result.push(obj);
        end += 5;
        str = str.substr(end);
    }
    return result;
}
