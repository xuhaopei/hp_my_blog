<template>
  <div class="managerHome" >
    <el-container style="height:100%">
      <el-aside width="250px" style="height:100%">
        <left-menu style="height:100%"></left-menu>
      </el-aside>
      <el-main style="padding:0">
        <transition name="slide-fade">
          <router-view />
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import LeftMenu from "@/views/ManagerHome/components/LeftMenu.vue";
import { validateLogin } from "@/utils/Validate";

export default {
  name: "article-titleList",
  components: {
    "left-menu": LeftMenu,
  },
  model: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    if (validateLogin() === false) this.$router.push("/");
  },
  mounted() {
    this.juedgeRight();
  },
  beforeDestory() {},
  methods: {
    juedgeRight(){
      if(this.$store.state.people.user.authority === 1) {
      } else {
        this.$message({
          type: "error",
          message: "您没有权限进入管理员页面",
        });
        this.$router.push("/");
      }
    }
  },
};
</script>

<style>
.managerHome {
  height: 100vh;
  background: #ffffff;
}
</style>
