<template>
  <div id="LeftNav">
    <LeftNavTop></LeftNavTop>
    <div class="LeftNavBody">
      <HpNavItem :item='allItems'></HpNavItem>
    </div>
  </div>
</template>
<script>
import LeftNavTop from "@/views/LeftNav/ChildrenCom/LeftNavTop.vue";
import HpNavItem from "@/components/other/HpNavItem.vue"


import { getDirectory } from "@/network/LeftNav.js";


export default {
  name: "",
  data() {
    return {
      allItems:[]
    };
  },
  components: {
    LeftNavTop,
    HpNavItem
  },
  created() {
      this.getAllDirectory();
  },
  methods:{
    async getAllDirectory(){
        this.$animation.createLoading();
        await getDirectory("/Directory/getAllDirectory")
          .then(Response => {
            this.allItems = Array.from(Response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$animation.cancelLoading();
    }
  },
  watch:{
    $route(to, from) {
       //this.getAllDirectory();
       let toName = to.name;
       if(toName === 'Home') {
         this.getAllDirectory();
       }
       let fromName = from.name;
       if(fromName === 'EditArticle') {
          this.getAllDirectory();
       }

    }
  }
};
</script>
<style >
#LeftNav {
  grid-area: LeftNav;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 64px 1fr;
  grid-template-areas:
    "LeftNavTop"
    "LeftNavBody";
  gap: 0;
}
#LeftNav .LeftNavBody {
  grid-area: LeftNavBody;
  padding: 8px 0;
}
</style>