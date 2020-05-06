<template>
  <div id="LeftNav">
    <LeftNavTop></LeftNavTop>
    <div class="LeftNavBody">
      <HpNavItem ></HpNavItem>
    </div>
  </div>
</template>
<script>
import LeftNavTop from "@/views/LeftNav/ChildrenCom/LeftNavTop.vue";
import HpNavItem from "@/components/other/HpNavItem.vue"

export default {
  name: "",
  data() {
    return {
      allItems: [
        ["1", "2", "3", "4"],
        ["22", "22", "22", "333"],
        ["123", "123"]
      ]
    };
  },
  components: {
    LeftNavTop,
    HpNavItem
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