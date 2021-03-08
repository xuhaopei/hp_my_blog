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
const UserHome = () => import('@/views/UserHome/Base.vue');
const UserSetting = () => import('@/views/UserSetting/Base.vue');
const MessageHandle = () => import('@/views/MessageHandle/Base.vue')

Vue.use(VueRouter);

  const routes = [
  // 主页
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      // 主页--阅读页
      {
        path:'/Home/ReadArticle/:Id',
        name:'ReadArticle',
        component:ReadArticle
      },
      // 主页--默认页
      {
        path:'/',
        name:'Main',
        component:Main
      },
      // 主页--用户页
      {
        path:'/Home/UserHome',
        name:'UserHome',
        component:UserHome,
        children:[],
      }, 
      // 主页--用户设置页
      {
        path:'/Home/UserSetting',
        name:'UserSetting',
        component:UserSetting,
        children:[],
      },    
      // 主页--消息管理页
      {
        path:'/Home/MessageHandle',
        name:'MessageHandle',
        component:MessageHandle,
        children:[],
      },      
    ]
  },
  {
    path: '/AllArticle/:pageId',
    name: 'AllArticle',
    component: AllArticle
  },
  // 登录页
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
  // 创建文章页
  {
    path:'/CreateArticle',
    name: 'CreateArticle',
    component:CreateArticle
  },
  // 编辑文章页
  {
    path:'/EditArticle/:Id',
    name: 'EditArticle',
    component:EditArticle
  },
  // 注册页
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
