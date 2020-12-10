import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animation from '@/assets/plugin/animationLoading.js'

import {
  Pagination,
  Calendar,
  Row,
  Col,
  Dialog,
  Table,
  TableColumn,
  Button,
  Switch,
  Input, 
} from 'element-ui';


Vue.config.productionTip = false

Vue.use(animation);
Vue.use(Pagination);
Vue.use(Calendar);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dialog);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Input);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
