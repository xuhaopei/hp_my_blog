import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js';
import actions from './actions.js'

import topNav from './modules/topNav.js';
import article from './modules/article.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:{                       // 设置加载状态控制
      isLoading:false,
      isSuccess:false
    },
    isChangeDirctor:0,                 // 监听目录状态更改
    searchArticleContent:''            // 查询内容
  },
  getters:{
  },
  mutations,
  actions,
  modules:{
    topNav,
    article
  }, 
})
