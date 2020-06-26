<template>
    <div id="TopNav">
        <router-link class="TopNav_title" to='/'> {{title}}</router-link>
        <div class="TopNav_msg">
            <div class="g-navHref TopNav_msg-search">
                <svg class="icon-search" t="1588147908928"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2445" width="200" height="200"><path d="M881.3 773.7L768.6 661.4c36.3-56.2 57.4-123 57.4-194.9 0-198.6-160.8-359.4-359.4-359.4s-359.4 161-359.4 359.4c0 198.6 160.8 359.4 359.4 359.4 72 0 139.1-21.2 195.3-57.6l112.5 112.1c32 31.9 81.9 33.9 111.4 4.5 29.4-29.4 27.4-79.3-4.5-111.2z m-414.9-67.4c-132.2 0-239.6-107.2-239.6-239.6 0-132.2 107.2-239.6 239.6-239.6S706 334.3 706 466.7c-0.2 132.4-107.4 239.6-239.6 239.6z" p-id="2446" fill="#ffffff"></path></svg>
                <input type="text" class="input-serach" placeholder="搜索" v-model="searchContent" @keyup.enter="search">
            </div>
            <a href="https://www.cnblogs.com/xuhaopei/" target="_blank">博客</a>
            <a href="https://github.com/xuhaopei/hp_my_blog" target="_blank">github</a>
            <a v-if="userName" @click="showMenu" >{{userName}}</a>
            <router-link v-else to="/Login">登录</router-link>
        </div>
    </div>
</template>
<script>

import {clearToken} from '@/network/Token.js';

export default {
    props:{
        title:{
            type:String,
            default:"正义的键盘侠"
        }
    },
    data(){
        return {
            userName:Object,
            searchContent:''
        }
    },
    mounted(){
        this.userName = localStorage.getItem('userName');
    },
    watch:{
        $route(to, from){
            let fromName = from.name;
            // 当从'/EditArticle'跳转时
            if(fromName === 'Login') {
                this.userName = localStorage.getItem('userName');
            }
        }
    },
    methods:{
        /**
         * 弹出菜单
         */
        showMenu(event) {
            event.stopPropagation();
            event.preventDefault(); // 阻止默认行为
            // 创建菜单容器
            var menu = document.createElement("ul");
            menu.setAttribute("id", "HpNavItem_menu1");
            menu.setAttribute('style',`
                background: white;
                position: absolute;
                padding:10px;
                width: 120px;
                right: 20px;
                top: 68px;
                box-shadow: 2px 2px 5px 5px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                justify-content: center;
            `);
            // 设置菜单的消失
            document.body.addEventListener('click',function(){
                let menu = document.getElementById('HpNavItem_menu1');
                menu && document.body.removeChild(menu);
            },false)
            // 创建 退出
            var item_signOut = document.createElement("li");
            item_signOut.setAttribute('style',`
            height:30px;
            line-height: 30px;
            font-size: 14px;
            `);
            item_signOut.addEventListener(
                "click",
                (e) => {
                    clearToken();
                    this.userName = '';
                },
                false
            );
            item_signOut.setAttribute("class", " g-navHref");
            item_signOut.innerText = "退出";

            menu.appendChild(item_signOut);
            document.body.appendChild(menu);
        },
        /**
         * 查询文章内容
         */
        search(){
            this.$router.push('/');
            this.$store.commit('setSearchArticle',this.searchContent);
        }
    }
    
}
</script>
<style >
#TopNav{
    
    background: rgb(155, 64, 240);
    grid-area: TopNav;
    box-shadow:  6px 1px 10px 5px rgba(0, 0, 0, 0.6);
    display: grid;
    grid-template-columns: minmax(150px, 1fr) 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'left right';
    gap:0;
}
#HpNavItem_menu1::before{
    content: '';
    display: block;
    position: absolute;
    right: 0px;
    top: -22px;
    border: 10px solid rgb(155, 64, 240);
    border-bottom: 10px solid white;
}
.TopNav_title {
    grid-area: left;
    color: white;
    font-size: 20px;
    text-indent: 20px;
    line-height: 64px;
}
.TopNav_msg {
    grid-area: right;
    display: grid;
    grid-template-columns: 200px 100px 100px 100px;
    grid-template-rows: 1fr;
    grid-template-areas: 'search left center right';
    justify-content:end;  /**设置网格在容器上的位置 */
    line-height: 64px;
    text-align: center;
    color:white;
}
.TopNav_msg-search {
    grid-area: search;
    justify-self: right;
    position: relative;
}

#TopNav a {
    text-decoration: none;
    color: white;
}
/**设置搜索框的内容 */
.input-serach {
    display: inline-block;
    height: 30px;
    background: rgb(196, 144, 245);
    border: 0;
    align-items: center;
    width: 120px;
    transition: width 0.2s ease-in-out;
    text-indent: 30px;
    color:white;
}
/**设置搜索框的提示文字的颜色 */
.input-serach::-webkit-input-placeholder {
	color: white;
}
.input-serach:-ms-input-placeholder { 
	color: white;
}
.input-serach:-moz-placeholder { 
	color: white;
}
.input-serach::-moz-placeholder { 
	color: white;
}
/**设置搜索框聚焦时出现动画效果 */
.input-serach:focus{
    width:200px;
    text-indent: 30px;
    outline: none;
}
/**控制搜索图标的大小以及位置 */
.icon-search {
    position: absolute;
    width: 20px;
    height: 30px;
    left: 5px;
    top:17px;
    
}
</style>