export default {
    state:()=>({
        version:'2.3.1'
    }),
    getters: {
        getVersion(state){
            return state.version;
        }
    },
}