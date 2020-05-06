import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
const Animation = () => import('@/components/other/AnimationTick.vue');
const Login = () => import('@/views/Login/Login.vue');
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/Login',
    name: 'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
