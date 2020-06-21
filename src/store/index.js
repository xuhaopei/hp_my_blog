import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{                       // 设置加载状态控制
      isLoading:false,
      isSuccess:false
    },
    user:null,
    isChangeDirctor:0                 // 监听状态更改
  },
  getters:{
  },
  mutations: {
    changeLoading(state){
      state.loading.isLoading = !state.loading.isLoading;   // 控制加载显示与消失
    },
    setLoadingSuccessOk(state){
      state.loading.isSuccess = true;                     //  控制加载转向成功加载图标
    },
    setLoadingSuccessFail(state){
      state.loading.isSuccess = false;                  //  控制加载转向失败加载图标
    },
    setUser(state,user){
      console.log(user);
      state.user = user;
    },
    changeDirctor(state){
      state.isChangeDirctor++;
    }
  },
  actions: {
  },
  modules: {
  }
})
