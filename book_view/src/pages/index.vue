<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div class="contentPic">
      <index-header-pic v-for="item in headerItems" v-bind:key="item._id" v-bind:recommendImg="item.recommendImg" v-bind:recommendSrc="item.recommendSrc" v-bind:recommendTitle="item.recommendTitle"></index-header-pic>
    </div>
    <div class="contentMain">
      <Row>
        <i-col span="11" offset="1">
          <Card>
            <p slot="title" style="font-size: 16px;">
              <Icon type="ios-videocam"></Icon>热映电影
            </p>
            <ul class="cont-ul">
              <movies-list v-for="item in movieItems" v-bind:key="item._id" v-bind:id="item._id" v-bind:movieName="item.movieName" v-bind:movieTime="item.movieTime"></movies-list>
            </ul>
          </Card>
        </i-col>
        <i-col span="10" offset="1">
          <Card>
            <p slot="title" style="font-size: 16px;">
              <Icon type="ios-document"></Icon>最新影评
            </p>
            <ul class="cont-ul">
              <news-list v-for="item in newsItems" v-bind:key="item._id" v-bind:id="item._id" v-bind:articleTitle="item.articleTitle" v-bind:articleTime="item.articleTime"></news-list>
            </ul>
          </Card>
        </i-col>
      </Row>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import UserMessage from '../components/UserMessage'
import IndexHeaderPic from '../components/IndexHeaderPic'
import MoviesList from '../components/MoviesList'
import NewsList from '../components/NewsList'
import CommonFooter from '../components/CommonFooter'
export default {
  name: 'index',
  data () {
    return {
      headerItems: [],
      newsItems: [],
      movieItems: []
    }
  },
  components: {CommonFooter, NewsList, MoviesList, IndexHeaderPic, UserMessage, MovieIndexHeader},
  // 用于获取数据，需要获取主页推荐、主页新闻和主页电影列表
  created () {
    // 获取主页推荐
    this.$http.get('http://localhost:3000/showIndex').then((data) => {
      this.headerItems = data.body.data
      console.log(data.body)
    })
    // 获取主页新闻
    this.$http.get('http://localhost:3000/showArticle').then((data) => {
      this.newsItems = data.body.data
      console.log(data.body)
    })
    // 获取主页电影列表
    this.$http.get('http://localhost:3000/showRanking').then((data) => {
      this.movieItems = data.body.data
      console.log(data.body)
    })
  }
}
</script>

<style lang="css" scoped>
  .container {
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 15px;
  }
  .userMessage{
    padding-top: 10px;
    margin-top: -10px;
    margin-left: 0px;
  }
  .contentPic{
    padding-top: 5px;
  }
  .cont-ul{
    padding-top: 0.5rem;
    background-color: #fff;
  }
  .cont-ul::after{
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
  }
</style>
