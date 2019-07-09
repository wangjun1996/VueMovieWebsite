<template lang="html">
  <div>
    <div style="height: 40px"></div>
    <div class="footer">
      <div class="footer">
        <p>
          <Icon type="logo-github" slot="prepend"></Icon>GitHub :
          <a href="https://github.com/wangjun1996">https://github.com/wangjun1996</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommonFooter'
  }
</script>

<style lang="css" scoped>
  .footer{
    width: 100%;
    height: 30px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #000;
    border-bottom: 0px solid #ccc;
  }
  .footer p{
    font-size: 13px;
    color: #fff;
    text-align: center;
    padding-top: 5px;
  }
</style>
