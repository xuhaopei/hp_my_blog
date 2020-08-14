import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
const CreateArticle = () => import('@/views/Article/CreateArticle.vue');
const EditArticle = () => import('@/views/Article/EditArticle.vue');
const ReadArticle = ()=> import('@/views/Article/ReadArticle.vue');
const AllArticle = ()=> import('@/views/Article/AllArticle.vue');
const Register = () => import('@/views/Register/Register.vue');

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AllArticle/:pageId',
    name: 'AllArticle',
    component: AllArticle
  },
  {
    path:'/Login',
    name: 'Login',
    component:Login
  },
  {
    path:'/CreateArticle',
    name: 'CreateArticle',
    component:CreateArticle
  },
  {
    path:'/EditArticle/:Id',
    name: 'EditArticle',
    component:EditArticle
  },
  {
    path:'/Register',
    name: 'Register',
    component:Register
  },
  {
    path:'/ReadArticle/:Id',
    name:'ReadArticle',
    component:ReadArticle
  }

]

const router = new VueRouter({
  routes
})

export default router
