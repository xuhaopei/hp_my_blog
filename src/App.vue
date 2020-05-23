<template>
  <div id="app">
    <TopNav></TopNav>
    <LeftNav></LeftNav>
    <Animation :loading="$store.state.loading" size=3></Animation>
    <router-view/>
  </div>
</template>


<script>
 import LeftNav from '@/views/LeftNav/LeftNav.vue'
 import TopNav from '@/views/TopNav/TopNav.vue'
 import Animation from '@/components/other/AnimationTick.vue'
 //<Animation :loading="$store.state.loading" size=3></Animation>
  export default {
    data(){
      return{
      }
    },
    components:{
      LeftNav,
      TopNav,
      Animation
    },
    methods:{
    },
    mounted(){
    }
  }
</script>

<style>
@import url(assets/css/base.css);

#app {
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 255px 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas: 'LeftNav TopNav'
                       'LeftNav Home';
  gap:0;

}
</style>
