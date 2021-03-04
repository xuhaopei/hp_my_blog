import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Main from '@/views/Home/ChildrenCom/Main.vue'
import Login from '@/views/Login/Login.vue'
import LoginByEle from '@/views/Login/LoginByEle.vue'
import RegisterByEle from '@/views/Register/RegisterByEle.vue'
const CreateArticle = () => import('@/views/Article/CreateArticle.vue');
const EditArticle = () => import('@/views/Article/EditArticle.vue');
const ReadArticle = ()=> import('@/views/ReadArticle/Base.vue');
const AllArticle = ()=> import('@/views/Article/AllArticle.vue');
const Register = () => import('@/views/Register/Register.vue');

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'/ReadArticle/:Id',
        name:'ReadArticle',
        component:ReadArticle
      },
      {
        path:'/',
        name:'Main',
        component:Main
      },
    ]
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
    path:'/LoginByEle',
    name: 'LoginByEle',
    component:LoginByEle
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
    path:'/RegisterByEle',
    name: 'RegisterByEle',
    component:RegisterByEle
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
