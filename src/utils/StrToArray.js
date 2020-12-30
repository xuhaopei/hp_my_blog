
/**
 * 将字符串标签根据逗号分割成一个数组，如果标签为undefined或者为null 则返回 []
 * @param {*} Str 
 */
export function TagsToArray(Str){
    if(!Str) return [];
    Str = Str.toString();
    return Str.split(',');
}