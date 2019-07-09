<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <h1>{{detail.articleTitle}}</h1>
      <div>{{detail.articleTime}}</div>
      <div class="contentText">{{detail.articleContext}}</div>
    </div>
    <comment v-bind:movie_id="article_id"></comment>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import Comment from '../components/Comment'

let article_id = 0
export default {
  name: 'newDetail',
  components: {Comment, CommonFooter, MovieIndexHeader},
  data () {
    return {
      detail: [],
      article_id: ''
    }
  },
  created () {
    this.article_id = this.$route.query.id
    article_id = this.$route.query.id
    // 根据id查找电影
    this.$http.post('http://localhost:3000/users/articleDetail', {article_id: article_id}).then((detailData) => {
      this.detail = detailData.body.data
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
    width: 100%;
  }
  .contentText{
    font-size: 15px;
    padding-top: 20px;
  }
</style>
