<template lang="html">
  <div class="container">
    <div>
    <movie-index-header></movie-index-header>
    </div>
    <div class="contentMain">
      <div>
        <div class="contentLeft"></div>
          <h3 slot="title" style="font-size: 16px;">
            <Icon type="ios-videocam"></Icon>电影列表
            <Divider />
          </h3>
        <ul>
          <movies-list v-for="item in movieItems" v-bind:key="item._id" v-bind:id="item._id" v-bind:movieName="item.movieName" v-bind:movieTime="item.movieTime"></movies-list>
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
import MoviesList from '../components/MoviesList'
export default {
  // name: 'moviesList',
  components: {MoviesList, CommonFooter, MovieIndexHeader},
  data () {
    return {
      movieItems: []
    }
  },
  created () {
    // 获取电影列表
    this.$http.get('http://localhost:3000/showMovie').then((data) => {
      this.movieItems = data.body.data
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
