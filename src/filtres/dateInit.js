import Vue from 'vue'

// 功能  将 “2020-12-15T13:23:59.000Z” 转成 “2020-12-15”
Vue.filter('dateInit', function(value){
    if (!value) return '';
    value = value.toString();
    return value.slice(0,value.indexOf('T'));
});