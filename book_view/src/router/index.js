import Vue from 'vue'
import Router from 'vue-router'
import VueRource from 'vue-resource'
// import IndexPage from '../pages/index.vue'
// import HelloWorld from '@/components/HelloWorld'
import MovieList from '../pages/moviesList.vue'
import MovieDetail from '../pages/movieDetail.vue'
import NewsDetail from '../pages/newsDetail.vue'
import LoginPage from '../pages/loginPage.vue'
import RegisterPage from '../pages/registerPage.vue'
import ForgetPassword from '../pages/forgetPassword.vue'
import UserInfo from '../pages/userInfo.vue'
import NewsList from '../pages/newsList.vue'
import Admin from '../pages/admin.vue'
import AdminMovieList from '../pages/adminMovieList.vue'
import AdminAddMovie from '../pages/adminAddMovie.vue'
import AdminArticleList from '../pages/adminArticleList.vue'
import AdminAddArticle from '../pages/adminAddArticle.vue'
import AdminCommentList from '../pages/adminCommentList.vue'
import AdminUserList from '../pages/adminUserList.vue'

Vue.use(Router)
Vue.use(VueRource)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/index'], resolve),
      meta: {
        title: 'home'
      }
    },
    {
      path: '/movieList',
      component: MovieList
    },
    {
      path: '/movieDetail',
      component: MovieDetail
    },
    {
      path: '/newsList',
      component: NewsList
    },
    {
      path: '/newsDetail',
      component: NewsDetail
    },
    {
      path: '/loginPage',
      component: LoginPage
    },
    {
      path: '/registerPage',
      component: RegisterPage
    },
    {
      path: '/forgetPassword',
      component: ForgetPassword
    },
    {
      path: '/userInfo',
      component: UserInfo
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/adminMovieList',
      component: AdminMovieList
    },
    {
      path: '/adminAddMovie',
      component: AdminAddMovie
    },
    {
      path: '/adminArticleList',
      component: AdminArticleList
    },
    {
      path: '/adminAddArticle',
      component: AdminAddArticle
    },
    {
      path: '/adminCommentList',
      component: AdminCommentList
    },
    {
      path: '/adminUserList',
      component: AdminUserList
    }
  ]
})
