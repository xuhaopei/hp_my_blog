import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Pagination} from 'element-ui';
import animation from '@/assets/plugin/animationLoading.js'

Vue.config.productionTip = false

Vue.use(animation);
Vue.use(Pagination);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
