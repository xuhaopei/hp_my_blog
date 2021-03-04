import Vue from 'vue'

// 功能  将 “2020-12-15T13:23:59.000Z” 转成 “2020-12-15”
Vue.filter('dateInit', function(value){
    if (!value) return '';
    value = value.toString();
    return value.slice(0,value.indexOf('T'));
});

// 功能  将 “2020-12-15T13:23:59.000Z” 转成 "23天"
Vue.filter('date2current', function(value){
    if (!value) return 0;
    // 获取输入值的毫秒时间time1
    let time1 =  Date.parse(value);
    // 获取当天时间的毫秒时间time2
    let time2 =  new Date().getTime();
    // 两者时间相减再算天数
    let days = (time2 - time1) / (24 * 60 * 60 * 1000);
    return Math.floor(days);
});