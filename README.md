# VueMovieWebsite
使用 Vue + Node.js + Express + MongoDB + iView 实现的一个电影社区网站

## 安装

此项目分为服务端和前端，服务端代码在 `book_service` 文件夹中，前端代码在 `book_view` 文件夹中

1. 先下载源代码，并且安装 `Node.js`

2. 安装模块：命令行环境进入`book_service` 文件夹，执行 `npm instll`，同样进入`book_view` 文件夹，执行 `npm instll`

3. 启动服务：命令行环境进入`book_service` 文件夹，执行 `npm start`，同样进入`book_view` 文件夹，执行 `npm start`

4. 在浏览器中打开网址即可： http://localhost:8080 

## 1.技术选择

数据库：[MongoDB](https://www.mongodb.com/)（一个介于关系数据库和非关系数据库之间的产品）

服务器端：[JavaScript](https://www.liaoxuefeng.com/wiki/1022910821149312) + [Node.js](http://nodejs.cn/) + [Express框架](http://www.expressjs.com.cn/)

前端：[Vue.js框架](https://cn.vuejs.org/index.html)

UI库：[iView](https://www.iviewui.com/)

## 2.开发环境

IDE：WebStorm

MongoDB可视化界面软件：Studio 3T

服务器测试：Postman客户端

## 3.主要功能

* 前台   

1. 用户的注册、登录、忘记密码、个人资料显示

2. 主页显示电影推荐及影评推荐

3. 电影详细信息页面：显示电影名称、上映日期、预告片地址、观看次数、点赞次数、观看地址、已审核的用户评论

4. 影评详细信息页面：显示影评标题、发布日期、影评内容、已审核的用户评论

5. 用户对电影的浏览、评论、点赞、跳转到观看网址

6. 用户对影评的浏览、评论

* 后台

1. 电影管理: 查询所有电影、添加电影、删除电影、修改电影信息、更新主页的推荐电影
   
2. 影评管理：查询所有影评、添加影评、删除影评、修改影评信息、更新主页的推荐影评
    
3. 评论管理：查询所有用户评论、删除用户评论、审核用户评论
     
4. 用户管理：查询所有用户、删除用户、封停/解封用户、修改用户身份（用户/管理员）、修改用户权限（0-普通用户，1-普通管理员，2-超级管理员，数字越大权限越高）

