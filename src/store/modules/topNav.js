export default {
    state:()=>({
        version:'2.1.1'
    }),
    getters: {
        getVersion(state){
            return state.version;
        }
    },
}