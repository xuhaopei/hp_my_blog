import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 过滤器
import './filtres/dateInit.js'

// ele组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {MessageBox} from  'element-ui';
Vue.use(ElementUI);

Vue.config.productionTip = false

// ele组件
// Vue.use(animation);
// Vue.use(Pagination);
// Vue.use(Calendar);
// Vue.use(Row);
// Vue.use(Col);
// Vue.use(Dialog);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(Button);
// Vue.use(Switch);
// Vue.use(Input);
// Vue.use(Tag);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
