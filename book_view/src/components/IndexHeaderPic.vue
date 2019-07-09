<template lang="html">
  <div class="headerPic">
      <div>
        <p class="imgTitle">{{ recommendTitle }}</p>
        <a v-bind:href=recommendSrc>
          <img v-bind:src=recommendImg class="headerImg"/>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'IndexHeaderPic',
  // 使用props方式进行值的传递
  props: ['recommendSrc', 'recommendImg', 'recommendTitle']
}
</script>

<style lang="css" scoped>
  .headerPic{
    height: 400px;
    width: 100%;
    background-color: antiquewhite;
  }
  .headerImg{
    height: 400px;
    width: 600px;
  }
  .imgTitle{
    z-index:2;
    padding-left: 47%;
    padding-top: 10px;
    position: absolute;
    color: #fff;
    font-size: 20px;
  }
</style>
