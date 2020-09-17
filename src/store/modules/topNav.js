export default {
    state:()=>({
        version:'2.0.0'
    }),
    getters: {
        getVersion(state){
            return state.version;
        }
    },
}