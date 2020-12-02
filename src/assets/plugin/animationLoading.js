

// 导出一个对象，该对象必须有install(Vue,options)方法,VUE官方规定使用自定义的插件必须有installf方法
export default {
    install(Vue, options){
        Vue.prototype.$animation = {

        }
    }
}