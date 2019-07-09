<template lang="html">
  <div>
    <div class="container">
      <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div>
        <h1>{{detail.movieName}}</h1>
        <div class="viewNum">上映日期：{{detail.movieTime}}</div>
        <div class="viewNum">预告片：{{detail.movieVideo}}</div>
        <div class="viewNum">观看次数：{{detail.movieNumDownload}}</div>
        <div class="viewNum">点赞次数：{{detail.movieNumSuppose}}</div>
      </div>
      <div>
        <img :src=detail.movieImg class="headerImg">
      </div>
      <div>
        <i-button type="info" v-on:click=movieDownLoad() style="margin-left: 10px"><Icon type="ios-play"></Icon>观看</i-button>
        <i-button type="info" v-on:click=support() style="margin-left: 10px"><Icon type="md-thumbs-up"></Icon>点赞</i-button>
      </div>
<!--      <div v-on:click="support" class="btnPosition">-->
<!--        <div class="SupportBtn">点赞<div>{{detail.movieNumSuppose}}</div></div>-->
<!--      </div>-->
      <div>
        <comment v-bind:movie_id="movie_id"></comment>
      </div>
      <div>
        <common-footer></common-footer>
      </div>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import Comment from '../components/Comment'

let movie_id = 0
export default {
  name: 'movieDetail',
  data () {
    return {
      detail: []
    }
  },
  components: {Comment, CommonFooter, MovieIndexHeader},
  created () {
    this.movie_id = this.$route.query.id
    movie_id = this.$route.query.id
    console.log(movie_id)
    // 根据id查找电影
    this.$http.post('http://localhost:3000/users/movieDetail', {movie_id: movie_id}).then((detailData) => {
      this.detail = detailData.body.data
      console.log(detailData.body)
    })
  },
  methods: {
    support: function (event) {
      this.$http.post('http://localhost:3000/users/support', {movie_id: movie_id}).then((supportData) => {
        let data_temp = supportData.body
        let that = this
        console.log(data_temp)
        if (data_temp.status === 0) {
          this.$http.post('http://localhost:3000/users/movieDetail', {movie_id: movie_id}).then((detailData2) => {
            that.detail['movieNumSuppose'] = detailData2.body.data.movieNumSuppose
            console.log(detailData2.body.data.movieNumSuppose)
          })
        }
        else {
          alert(supportData.body.message())
        }
      })
    },
    movieDownLoad: function (event) {
      this.$http.post('http://localhost:3000/users/download', {movie_id: movie_id}).then((downloadData) => {
        console.log(downloadData.body)
        if (downloadData.body.status === 0) {
          window.location = downloadData.body.data
        }
        else {
          alert(downloadData.body.message())
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .headerImg{
    height: 350px;
  }
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .contentMain{
    padding-top: 20px;
  }
  .btnPosition{
    padding-left: 50%;
  }
  .SupportBtn{
    border: solid 1px #000;
    width: 80px;
  }
  .viewNum{
    font-size: 12px;
  }
</style>
