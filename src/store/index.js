import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:false
  },
  getters:{
  },
  mutations: {
    changeLoading(state){
      state.loading = !state.loading;
      console.log(state.loading ,1111111)
    }
  },
  actions: {
  },
  modules: {
  }
})
