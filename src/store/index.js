import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{                       // 设置加载状态控制
      isLoading:false,
      isSuccess:false
    },
    userName:null,
    isChangeDirctor:0,                 // 监听目录状态更改
    searchArticleContent:''                // 查询内容
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
    setUserName(state,userName){
      state.userName = userName;
    },
    changeDirctor(state){
      state.isChangeDirctor++;
    },
    setSearchArticle(state,content) {
      state.searchArticleContent = content;
    }
  },
  actions: {
  },
  modules: {
  }
})
