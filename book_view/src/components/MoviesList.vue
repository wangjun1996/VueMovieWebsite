<template lang="html">
  <div class="movieList">
    <div>
      <router-link :to="{path: 'movieDetail', query: { id: id}}" class="goods-list-link">
        {{movieName}} : {{movieTimeShow}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'MoviesList'
  data () {
    return {
      movieTimeShow: ''
    }
  },
  props: ['id', 'movieName', 'movieTime'],
  created () {
    this.movieTimeShow = this.movieTime
  }
}
</script>

<style lang="css" scoped>
  .movieList{
    padding: 5px;
    bordr-bottom: 1px dashed #ababab;
    font-size: 16px;
  }
</style>
