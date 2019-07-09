<template lang="html">
<!--  <li class="goods-list">-->
    <div class="newsList">
      <div>
        <router-link :to="{path: '/newsDetail', query: {id: id}}" class="goods-list-link">
          {{articleTitle}}
          {{articleTime}}
        </router-link>
      </div>
    </div>
<!--  </li>-->
</template>

<script>
export default {
  name: 'NewsList',
  props: ['id', 'articleTitle', 'articleTime'],
  created () {
    this.articleTime = this.articleTime
  }
}

</script>

<style lang="css" scoped>
  .newsList{
    padding: 5px;
    font-size: 16px;
    bordr-bottom: 1px dashed #ababab;
  }
</style>
