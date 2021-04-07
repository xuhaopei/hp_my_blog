<template>
  <div id="app">
      <transition name="slide-fade">
        <router-view />
      </transition>
  </div>
</template>


<script>

import {setHeaderToken} from '@/network/Token.js';

export default {
  data() {
    return {
      directorys: Object
    };
  },
  components: {
  },
  methods: {
  },
  created(){
    let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")) : null;
    setHeaderToken(localStorage.getItem("token"))
    this.$store.commit('setUser',user);
  }

};
</script>

<style lang="less">
@import url(assets/css/base.css);

#app {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>
