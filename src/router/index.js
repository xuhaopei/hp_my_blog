import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
const Animation = () => import('@/components/other/AnimationTick.vue');
const Login = () => import('@/views/Login/Login.vue');
const Article = () => import('@/views/Article/Article.vue');
const Register = () => import('@/views/Register/Register.vue')
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
  },
  {
    path:'/Article',
    name: 'Article',
    component:Article
  },
  {
    path:'/Register',
    name: 'Register',
    component:Register
  },

]

const router = new VueRouter({
  routes
})

export default router
