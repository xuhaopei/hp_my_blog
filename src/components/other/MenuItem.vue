<template>
  <div
    class="MenuItem"
    v-show="isVisible"
    @mouseleave="isVisible = false"
    :style="{ left: event.pageX - 10 + 'px', top: event.pageY - 10 + 'px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "menu-item",
  components: {},
  model: {},
  props: {
    visible: Boolean,
    event: PointerEvent,
  },
  data() {
    return {
      isVisible: this.visible,
    };
  },
  computed: {},
  watch: {
    visible(val, oldVal) {
       this.isVisible = val;
    },
    isVisible(val, oldVal) {
      this.$emit("update:visible", val);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.MenuItem {
  position: fixed;
  z-index: 9999;
  background: white;
  width: 200px;
  left: 0;
  top: 0;
  box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  *{
    padding: 0;
    text-indent: 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #2196f3;
    text-align: center;
  }
}
</style>
