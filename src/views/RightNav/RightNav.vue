<template>
    <div id='rightNav'>
        <!--
        <HpDate></HpDate>
        -->
        <transition name="slide-fade">
            <NewAriticleList v-if="isShow_NewAriticleList"></NewAriticleList>
        </transition>
        <!--
        <ArticleTitleList></ArticleTitleList>
        -->
        <transition name="slide-fade">
            <ArticleTitleList v-show='isShow_ArticleTitleList'></ArticleTitleList>
        </transition>
        
        <transition name="slide-fade">
            <CalenderPlan v-if='isShow_NewAriticleList'> </CalenderPlan>
        </transition>
    </div>
</template>
<script>
import NewAriticleList from     '@/views/RightNav/ChildrenCom/NewArticleList.vue';
import HpDate from              '@/views/RightNav/ChildrenCom/Date.vue';
import ArticleTitleList from    '@/views/RightNav/ChildrenCom/ArticleTitleList.vue';
import CalenderPlan from        '@/views/RightNav/ChildrenCom/CalenderPlan.vue';

export default {
    data(){
        return {
            isShow_NewAriticleList:false,
            isShow_ArticleTitleList:false
        }
    },
    components:{
        NewAriticleList,
        HpDate,
        ArticleTitleList,
        CalenderPlan
    },
    mounted(){
    },
    watch:{
        $route(to,from) {
          this.isShow_NewAriticleList = to.name === 'AllArticle' ? true:false;
          this.isShow_ArticleTitleList= to.name === 'ReadArticle'? true:false;
        }
    }
}
</script>
<style lang="less">
#rightNav{
    flex:none;
    width: 280px;
    padding:10px 4px 10px 0px;
}
</style>