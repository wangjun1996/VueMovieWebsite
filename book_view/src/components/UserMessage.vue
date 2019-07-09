<template lang="html">
    <div v-if="!isLogin" class="header">
      <Row>
        <i-col span="2" offset="22">
          <router-link to="/loginPage">
            <div class="header_menu">登录</div>
          </router-link>
        </i-col>
      </Row>
    </div>
  <div v-else class="header">
    <Row>
      <i-col span="8" offset="16">
        <div class="header_menu" v-on:click=logout() style="cursor: pointer">注销</div>
        <router-link :to="{path: '/userInfo', query:{ id: id}}">
          <div class="header_menu" v-if="!isAdmin">个人信息</div>
        </router-link>
        <div class="header_menu">已登录：{{username}}</div>
        <div class="header_menu" v-if="isAdmin">后台管理</div>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'UserMessage',
  data () {
    return {
      isLogin: false,
      isAdmin: true,
      username: ''
    }
  },
  created () {
    // 对Session进行检测，存在则显示已登录，不存在则显示登录
    let token = sessionStorage.getItem('token')
    if (token) {
      this.isLogin = true
      this.username = sessionStorage.getItem('username')
      this.id = sessionStorage.getItem('_id')
      let user_data = {
        user_id: sessionStorage.getItem('_id')
      }
      this.$http.post('http://localhost:3000/users/showIdentity', user_data).then((userData) => {
        this.isAdmin = userData.body.data[0].userAdmin
      })
    } else {
      console.log('用户登录失败')
    }
  },
  methods: {
    logout: function (event) {
      sessionStorage.clear()
      // this.$router.go(0)
      this.$router.push({path: '/loginPage'})
      // this.$Modal.success({
      //   title: '已退出登录'
      // })
    }
  }
}
</script>

<style lang="css" scoped>
  .header{
    width: 100%;
    height: 30px;
    left: 0;
    top: 0;
    color: #000;
    background-color: rgba(94, 153, 180, 0.75);
  }
  .header_menu{
    padding-right: 30px;
    padding-top: 6px;
    float: right;
    color: #fff;
    font-size: 14px;
  }
</style>
