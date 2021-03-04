export default {
    state:()=>({
        // user:{
        //     name:'',
        //     school:'',
        //     college:'',
        //     major:'',
        //     class:'',
        //     email: '',
        //     password: '',
        //     token:''
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