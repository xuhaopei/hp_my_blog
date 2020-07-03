<template>
    <div id="ReadArticle"  v-html="article.articleContent" v-on:click.stop.prevent.right="showMenu">

    </div>
</template>
<script>

import {getArticle,deleteArticle} from '@/network/Article.js';

export default {
    props:{
        articleCotent:{
            type:String,
            default:'文章内容不存在~'
        }
    },
    data(){
        return {
            article:this.articleCotent
        }
    },
    created(){
        //this.readArticle(this.$route.params.Id);
    },
    mounted(){
        this.readArticle(this.$route.params.Id);
        
    },
    methods:{
        /**
         * 根据ele元素里面的h标签创建ele元素的导航
         */
        createArticleTitleNav(ele){
            /**判断容器是否存在，存在则移除 */
            let navWrapper = document.getElementById('ArticleTitleNav');
            if(navWrapper){
                document.body.removeChild(navWrapper);
            }

            /**设置导航容器 */
            navWrapper = document.createElement('nav');
            navWrapper.setAttribute('id','ArticleTitleNav');
            navWrapper.setAttribute('style',`
                position: fixed;
                margin: 10px;
                top:  68px;
                right: 0;
                width: 220px;
                box-shadow: 0px 0px 5px 5px rgb(146,146,144);
            `);

            /**获取ele元素里面的h标签 */
            let sons = ele.getElementsByTagName('*');
            let hsArray = [];
            sons.forEach(element => {
                let tagName = element.nodeName;
                if(tagName[0] === 'H') {
                    hsArray.push(element);
                }
            });

            /**根据hs标签数组设置ID并为导航容器navWrapper添加a元素标签*/
            let num = 0;
            hsArray.forEach(element => {
                let li = document.createElement('li');
                li.setAttribute('style',`
                    margin:10px 0;
                `)
                let a = document.createElement('a');
                element.setAttribute('id','title_go'+num);
                a.setAttribute('href','#title_go'+num);
                a.innerText = element.innerText;
                li.appendChild(a);
                navWrapper.appendChild(li);
                num++;
            });
            /**设置监听，如果大于100px则改变导航容器navWrapper的top属性 */
            let articleH = parseInt(navWrapper.style['top']);
            window.addEventListener('scroll',()=>{
                const top =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //兼容不同的浏览器

                if (top > articleH) {
                    
                    navWrapper.style['top'] = 0;
                }
                else {
                    let hight = articleH - top;
                    navWrapper.style['top'] = hight+'px';
                }
            })

            document.body.appendChild(navWrapper);
        },
        async readArticle(articleId){
            this.$animation.createLoading();
            await getArticle('/Article/find',articleId).then((Response)=>{
                        this.article = Response.data;
                        
                    }).catch((err)=>{
                        console.log(err);
                    })
            this.createArticleTitleNav(document.getElementById('ReadArticle'));        
            this.$animation.cancelLoading();
        },
        /**
         * 右击弹出菜单
         */
        showMenu(event) {
            // 创建菜单容器
            var menu = document.createElement("ul");
            menu.setAttribute("id", "HpNavItem_menu");
            menu.style["left"] = event.pageX - 10 + "px";
            menu.style["top"] = event.pageY - 10 + "px";
            // 设置离开菜单的时候菜单消失
            menu.addEventListener("mouseleave", function(event) {
                menu.parentNode.removeChild(menu);
            });

            var item_director = document.createElement("li"); // 创建文章
            item_director.addEventListener(
                "click",
                () => {
                this.$router.push("/CreateArticle");
                },
                false
            );
            item_director.setAttribute("class", " g-navHref");
            item_director.innerText = "创建文章";

            var item_manager = document.createElement("li"); // 编辑
            item_manager.addEventListener(
            "click",
            () => {
                let articleId = this.$route.params.Id;
                this.$router.push("/EditArticle/" + articleId);
            },
            false
            );
            item_manager.setAttribute("class", " g-navHref");
            item_manager.innerText = "编辑文章";

            var item_delete = document.createElement("li"); // 删除
            item_delete.addEventListener(
            "click",
            () => {
                let articleId = this.$route.params.Id;
                this.$animation.createLoading();
                deleteArticle("/Article/delete",articleId).then((Response)=>{
                    this.$router.push('/');
                    this.$animation.cancelLoading();
                }).catch((err)=>{
                    
                    this.$animation.cancelLoading();
                    console.log(err);
                    alert('删除失败');
                })
  
            },
            false
            );
            item_delete.setAttribute("class", " g-navHref");
            item_delete.innerText = "删除";

            menu.appendChild(item_delete);
            menu.appendChild(item_manager);
            menu.appendChild(item_director);
            document.body.appendChild(menu);
            }
        },
        /**
         * 根据文章ID删除文章
         */
        async deleteArticle1(articleId) {  
            this.$animation.createLoading();
            await deleteArticle("/Article/delete",articleId).then((Response)=>{
                this.$router.push('/');
            }).catch((err)=>{
                console.log(err);
                alert('删除失败');
            })
            this.$animation.cancelLoading();
        }, 

    watch:{
        $route(to, from) {
            this.readArticle(this.$route.params.Id);
        }
    } 
}
</script>

<style lang="less" scoped>
#ReadArticle {
    position: relative;
    padding: 30px;
    background: white;
    margin: 10px 0px 0px 10px;
    box-shadow: 0px 0px 5px 5px rgb(146,146,144);
    border-radius:10px;
    line-height: 30px;
    width: 75%;

}
    #test {
    position: fixed;
    margin: 10px;
    top:10%;
    right: 0;
    width: 220px;
    box-shadow: 0px 0px 5px 5px rgb(146,146,144);
    height: 100px;
}

</style>