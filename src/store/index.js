import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{
      isLoading:false,
      isSuccess:false
    },
    user:null
  },
  getters:{
  },
  mutations: {
    changeLoading(state){
      state.loading.isLoading = !state.loading.isLoading;
    },
    setLoadingSuccessOk(state){
      state.loading.isSuccess = true;
    },
    setLoadingSuccessFail(state){
      state.loading.isSuccess = false;
    },
    setUser(state,user){
      console.log(user);
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
