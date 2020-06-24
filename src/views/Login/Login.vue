<template>
    <div id="login">
        <form class="form-warpper">
            <div class="tip-wrapper">
                <span style="color:red">{{tip}}</span>
            </div>
            <div class="header">
                login
            </div>
            <div class="input-wrapper">
                <div class="border-wrapper">
                    <input type="text"  name="username" placeholder="username" class="border-item" v-model="username">
                </div>
            </div>
            <div class="input-wrapper">
                <div class="border-wrapper">
                    <input type="password"  name="password" placeholder="password" class="border-item" v-model="password">
                </div>
            </div>
            <div class="action">
                <div class="btn" @click="checkForm">login</div>
            </div>
            <div class="icon-wrapper">
                <i class="iconfont icon-gongzuozongjie"></i>
                <i class="iconfont icon-github"></i>
            </div>
            <div class="tip-wrapper">
                没有账号？赶快<router-link to="/register">注册</router-link>吧
            </div>
        </form>
    </div>
</template>
<script>
const hpValidateForm = require('hp-validate-form');
import jwt from 'jsonwebtoken';

import {doLogin,setHeaderCookie} from '@/network/Login.js';
import {setToken} from '@/network/Token.js';


export default {
    props:{},
    name:'login',
    data(){
        return {
            hpValidateForm,
            username:'',
            password:'',
            tip:''
        }
    },
    methods:{
        /**
         * 检查表单提交情况
         */
        checkForm(){
            var msg = '';
            msg = this.hpValidateForm.checkUserName(this.username,1);
            if(msg != '正确') {
                this.tip = msg;
                return;
            }

            msg = this.hpValidateForm.checkPassword(this.password,6);
            if(msg != '正确') {
                this.tip = msg;
                return;
            }

            var that = this;
            this.tip = '';
            //this.$store.commit('changeLoading');
            var obj = {
                username:that.username,
                password:that.password
            };

            this.$animation.createLoading();
            doLogin('/user/login',obj).then((Response)=>{
                let token = Response.data.token ;   // 获取到token
                let user  = Response.data.user;     // 获取到用户信息
                localStorage.setItem('userName',user.userName); 
                localStorage.setItem('token',token);
                setToken();
                //this.$store.commit('setUser',user);
                // this.$store.commit('setLoadingSuccessOk');
                // this.$store.commit('changeLoading');
                
                this.$router.push("/");
            }).catch((err)=>{
                console.log(err);
                this.tip = '不存在此用户';
                // this.$store.commit('setLoadingSuccessFail');
                // this.$store.commit('changeLoading');
            });
            this.$animation.cancelLoading();
        },
        /**
         * 创建cookie，并将cookie设置在axios实例中
         */
        createCookie(token){
            //document.cookie = "username=Steve Jobs;expires=Sun, 31 Dec 2022 12:00:00 UTC;";
            console.log(document.cookie )
        },
        
    }
}
</script>
<style >
#login {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(225,225,225);
    
}
.form-warpper {
    width: 300px;
    background: white;
    border-radius:2px ;
    padding: 50px;
    box-shadow: 1px 1px 10px 10px rgba(0,0,0,0.3);
}
.form-warpper .header{
    text-align: center;
    font-size: 35px;
    text-transform: uppercase;
    line-height: 100px;
}
.form-warpper .input-wrapper input {
    background: white;
    border: 0px;
    width: 100%;
    text-align: center;
    outline: none;  /*设置外边框无颜色*/

}

.form-warpper .input-wrapper input::placeholder {
    text-transform: uppercase;
    color:rgb(146,146,146);
}

/*设置外边框的样式 */
.form-warpper .input-wrapper .border-wrapper {
    background-image: linear-gradient(to right, #e8198b,#0eb4dd); /**只有background-image才可以设置渐变色 */
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    border-radius:30px ;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-warpper .input-wrapper .border-wrapper .border-item {
    height: calc(100% - 4px);
    width: calc(100% - 4px);
    border-radius:30px ;
}

.form-warpper .action {
    display: flex;
    justify-content: center;
}
.form-warpper .action .btn {
    width: 68%;
    text-transform: uppercase;
    border:2px solid #0e92b3;
    text-align: center;
    line-height: 50px;
    border-radius:30px ;
    cursor: pointer;
    transition: 0.2s;
    -webkit-user-select:none ;
    -moz-user-select:none;
}
.form-warpper .action .btn:hover {
    background-color: #0e92b3;
    color: white;
}

.form-warpper .icon-wrapper {
    text-align: center;
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    border-top: 1px dashed rgb(146,146,146);
    padding: 20px;

}

.form-warpper .icon-wrapper i {
    font-size: 20px;
    color:rgb(146,146,146);
    padding: 5px;
    border-radius:20px;
}
.tip-wrapper {
    font-size: 12px;
    text-align: center;
}
</style>