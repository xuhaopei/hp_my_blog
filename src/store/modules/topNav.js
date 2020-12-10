export default {
    state:()=>({
        version:'2.1.0'
    }),
    getters: {
        getVersion(state){
            return state.version;
        }
    },
}