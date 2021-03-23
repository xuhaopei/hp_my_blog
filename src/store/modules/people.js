export default {
    state:()=>({
        // user:{
            // authority:0
            // class:"2017届"
            // creatDate:"2021-03-14T11:07:22.000Z"
            // email:"986119817@qq.com"
            // id:4
            // major:"["管理科学与工程类","信息管理和信息系统"]"
            // password:"123456"
            // school:"["北京","清华大学"]"
            // sex:"男"
            // userName:"许浩培"
        // }
        user:null,
    }),
    getters: {
        getUser(state){
            return state.user;
        }
    },
    mutations:{
        setUser(state,playload){
            state.user = playload;
        },
        clearUser(state){
            state.user = null;
        }
    }
}