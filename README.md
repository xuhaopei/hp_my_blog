# 博客开发文档说明

## assets

### js

#### animationLoading.js

加载动画的创建与取消。

### plugin

使用插件，向VUE注入全局属性/方法

#### animationLoading.js

加载动画的创建与取消。

## components

### only

### other（可在其它项目复用的组件）

#### HpNavItem.vue

（左导航的条目显示）

难点：

1.通过::after添加三角形，动态更改为伪对象样式。

2.递归调用自身组件。

3.v-on={事件:方法,事件:方法} 不能携带参数，需要单独分开。

```javascript
v-on:click=" showMsg(index,$event)"

v-on="{

mouseover: addClassCss,

mouseout: removeClassCss

}"
```

4.动态创建DIV的时候，要设置background-color，不然会变成透明状态。

5.在循环创建组件/元素的时候，要用一个div来包裹住，然后给普通样式添加class。

6.递归组件要通知顶级父级组件要用vue-x或者bus 我使用的是vue-x

#### AnimationTick.vue

(圆圈打勾打叉动画)

使用方法：

需要在App.vue组件引入，然后其它组件通过vuex控制loading来管理它。

#### HpEdit.vue（弃用）

(富文本)

#### WangEditor.vue

(富文本)

## network(axios)

(各个视图的网络请求的封装)

返回一个promise，更换第三方插件会很容易，因为每个方法最后都返回一个promise

#### Article.js

(文章视图的网络请求集合)

#### base.js

(基础的网络封装)

这里面主要设置了请求头，设置请求协议，设置cookie等

#### LeftNav.js

(左导航的网络请求，主要请求目录)

#### Login.js

(登录的网络请求)

#### Register.js

(注册的网络请求)

## router(VUE-router)

(各个组件的路由控制)

index.js

## store（Vue-x）

全局状态管理

index.js

## views（网站的视图）

### LeftNav（左导航）

#### ChildrenCom

##### LeftNavTop.vue

（导航标题）

#### LeftNav.vue

（左导航）

难点:

1.简单的监听vue-x里面的state方法

  '$store.state.test':function(){

  }

### TopNav（顶导航）

#### TopNav.vue

（顶导航）

难点：

1.去除input type="text"的边框

```
outline: none;
```

2.使用淘宝icon上的SVG代码 修改大小

```
svg class="icon-search"

/**控制搜索图标的大小以及位置 */

.icon-search {

  position: absolute;

  width: 20px;

  height: 30px;

  left: 5px;

  top:17px;

}
```

### Article(文章的操作)

#### CreateArticle.vue

(创建文章)

#### EditArticle.vue

(编辑文章)

注意点：

//切记新建目录对象里面的smaillitems:[[]];

#### ReadArticle.vue

(读文章)

给读的文章添加了删除修改以及添加文章。

添加文章导航功能

#### AllArticle.vue

(显示文章)

基本完成，但是没有分页 需要制作分页。

有个难点，那就是多行显示后，省略号。这个没实现。只显示了一行。



### Login（登录）

#### Login.vue

### Register（注册）

#### Register.vue

## App.vue(视图入口)

## main.js(项目入口)

# 需求说明

| 日期       | 需求内容                                                     | 重要程度 | 完成情况                                    | 完成日期 | 解决思路                                                     |
| ---------- | ------------------------------------------------------------ | -------- | ------------------------------------------- | -------- | ------------------------------------------------------------ |
| 2020/07/18 | 将文件夹network的参数改成默认参数，如果没有则报错。具体实现参考http://116.85.46.202/#/ReadArticle/49 | 1        |                                             |          |                                                              |
| 2020/07/22 | 将查询关键字的内容附上红色字体。                             | 2        | 完成                                        |          |                                                              |
| 2020/07/22 | 剔除查找内容为html内容，改为text内容。                       | 3        | 完成                                        |          |                                                              |
|            | 给首页添加分页效果，数据太多啦，一次性读不出来。             | 5        | 完成                                        |          |                                                              |
|            | 信息提示，特别是错误信息没有显示出来。                       | 3        | 完成                                        |          |                                                              |
| 2020/07/26 | 统一拦截器处理，信号弹出框，动画加载                         | 3        | 完成                                        |          |                                                              |
|            | 模糊查询添加分页效果，剔除查询中的内容。                     | 2        | 完成                                        |          |                                                              |
| 2020/07/26 | 删除确认提示框                                               | 2        | 完成                                        |          |                                                              |
| 2020/07/26 | 左边导航显示如果文字过长会变成两行，把它设置成一行，超过用省略号表示。 | 2        | 完成                                        |          |                                                              |
| 2020/07/28 | 左边导航显示如果是文件夹则加粗                               | 2        | 完成                                        |          |                                                              |
| 2020/07/29 | 在编辑文章页面添加保存按钮。                                 | 4        | 完成                                        |          | 添加个额外保存方法即可                                       |
|            | 数据库表限制了一些文字的长度，后台也要设置长度的拦截         | 2        |                                             |          |                                                              |
|            | 跳转到登录页面时间很长                                       | 3        | 完成                                        |          |                                                              |
| 2020/08/07 | 请求不到数据提示语言错误，修改成“请求超时，请重新请求数据”   | 4        | 完成                                        |          |                                                              |
|            | 页面返回的时候没有跳转回原来的页数。                         | 3        | 完成，但是有bug，bug表现为返回后页码从1开始 |          | 给url添加pageID                                              |
|            | 页面字符没有自动换行。                                       | 4        | 完成                                        |          |                                                              |
|            | 数据查询按最新时间显示                                       | 3        | 完成                                        |          | sql order by desc 注意要在limit前面                          |
| 2020/08/08 | 提示删除的目录或者文章要提示删除的文字                       | 3        | 完成                                        |          | 组件添加dangerouslyUseHTMLString: true属性，使msg被解析为html |
|            | 文章阅读页面的右边导航修改文字多则隐藏。                     | 4        | 完成                                        |          | text-overflow: ellipsis;white-space: nowrap;                 |

