<template>
  <div id="app">
    <TopNav></TopNav>
    <LeftNav></LeftNav>
    <Home></Home>
  </div>
</template>


<script>
 import LeftNav from '@/views/LeftNav/LeftNav.vue'
 import TopNav from '@/views/TopNav/TopNav.vue'
 import Home from '@/views/Home/Home.vue'
 
  export default {
    data(){
      return{
      }
    },
    components:{
      LeftNav,
      TopNav,
      Home
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
