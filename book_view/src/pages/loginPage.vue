<template lang="html">
  <div>
    <div class="container">
      <movie-index-header></movie-index-header>
    </div>
    <div class="box">
      <div style="width: 20%;padding-top: 8%">
        <h2>用户登录</h2>
        <div class="box">
          <i-input type="text" v-model="username" size="large" placeholder="请输入用户名" autofocus>
            <Icon type="ios-person" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-input type="password" v-model="password" size="large" placeholder="请输入密码">
            <Icon type="ios-lock" slot="prepend"></Icon>
          </i-input>
        </div>
      </div>
    </div>
    <div class="box">
      <i-button type="primary" v-on:click="userLogin" size="large">登录</i-button>
      <i-button type="success" v-on:click=userRegister() size="large" style="margin-left: 10px">注册</i-button>
      <i-button type="default" v-on:click=forgetPassword() size="large" style="margin-left: 10px">忘记密码</i-button>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'

export default {
  name: 'loginPage',
  components: {CommonFooter, MovieIndexHeader},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    // 跳转到的登录页面
    userLogin: function (event) {
      this.$http.post('http://localhost:3000/users/login', {username: this.username, password: this.password}).then((loginData) => {
        if (loginData.body.status === 0) {
          let save_token = {
            token: loginData.body.data.token,
            username: this.username
          }
          sessionStorage.setItem('token', loginData.body.data.token)
          sessionStorage.setItem('username', this.username)
          sessionStorage.setItem('_id', loginData.body.data.user[0]._id)
          if (loginData.body.data.user[0].userAdmin) {
            // 若是管理员用户则跳转到后台页面
            this.$router.push({path: 'admin', query: {id: loginData.body.data.user[0]._id}})
          } else {
            this.$router.push({path: '/'})
          }
        } else {
          this.$Modal.error({
            title: '登录失败',
            content: loginData.body.message
          })
          // alert(loginData.body.message)
        }
      })
    },
    // 跳转到注册页面
    userRegister: function (event) {
      this.$router.push({path: 'registerPage'})
    },
    // 跳转到找回面膜页面
    forgetPassword: function (event) {
      this.$router.push({path: 'forgetPassword'})
    }
  }
}
</script>

<style lang="css" scoped>
  .container{
    width: 100%;
    margin: 0 auto;
  }
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
