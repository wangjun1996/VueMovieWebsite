<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft"></div>
        <h3 slot="title" style="font-size: 16px;">
          <Icon type="ios-document"></Icon>影评列表
          <Divider />
        </h3>
        <ul class="cont-ul">
          <news-list v-for="item in newsItems" v-bind:key="item._id" v-bind:id="item._id" v-bind:articleTitle="item.articleTitle" v-bind:articleTime="item.articleTime"></news-list>
        </ul>
      </div>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import NewsList from '../components/NewsList'
export default {
  // name: 'newsList',
  components: {NewsList, CommonFooter, MovieIndexHeader},
  data () {
    return {
      newsItems: []
    }
  },
  created () {
    // 获取电影列表
    this.$http.get('http://localhost:3000/showAllArticle').then((data) => {
      this.newsItems = data.body.data
      console.log(data.body)
    })
  }
}
</script>

<style lang="css" scoped>
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 50px;
  }
  .contentLeft{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
