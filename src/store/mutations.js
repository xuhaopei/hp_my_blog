export default {
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
  }