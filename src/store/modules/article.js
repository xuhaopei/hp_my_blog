import {
    getDirectory as http_getDirectory,
    createDirector as http_createDirector,
    updateDirectory as http_updateDirectory,
    deleteDirector  as http_deleteDirector,
} from '@/network/LeftNav.js';

import {
    getArticle as http_getArticle,
    getSomeNearArticle as http_getSomeNearArticle
} from '@/network/Article.js'

export default {
    state:()=>({
        article:{},
        directors:[],
        nearArticles:[]
    }),
    getters: {
        getArticle(state){
            return state.article;
        },
        getDirector(state) {
            return state.directors;
        },
        getSomeNearArticle(state) {
            return state.nearArticles;
        }
    },
    mutations:{
        setArticle(state,playload) {
            state.article = playload;
        },
        setNearArticle(state,playload) {
            state.article = playload;
        },
        setDirector(state,playload) {
            state.directors = playload;
        },
    },
    actions:{
        getDirector({commit,state},playload) {
            http_getDirectory(playload.url,playload.parmas).then((msg)=>{
                commit('setDirector',msg.data);
            })
        },
        getSomeNearArticle({commit},playload) {
            return http_getSomeNearArticle(playload.url,playload.parmas).then((msg)=>{
                commit('setNearArticle',msg.data);
                return Promise.resolve(msg.data);
            })
        },
        addDirector({commit,state},playload) {
            return http_createDirector(playload.url,playload.parmas);
        },
        updateDirector({},playload) {
            return http_updateDirectory(playload.url,playload.parmas);
        },
        deleteDirector({},playload) {
            return http_deleteDirector(playload.url,playload.parmas);
        },

        getArticle({commit},playload) {
            http_getArticle(playload.url,playload.parmas.id).then((msg)=>{
                commit('setArticle',msg.data);
            })
        }
    }

}