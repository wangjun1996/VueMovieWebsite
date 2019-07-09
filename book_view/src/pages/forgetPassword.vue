<template>
  <div>
    <div class="container">
      <movie-index-header></movie-index-header>
    </div>
    <div class="box">
      <div v-show="showUserInfo" style="width: 20%;padding-top: 8%">
        <h2>设置新密码</h2>
        <div class="box">
          <i-input type="text" v-model="username" placeholder="请输入用户名">
            <Icon type="ios-person" slot="prepend"></Icon>
          </i-input>
        </div>

        <div class="box">
          <i-input type="text" v-model="userMail" placeholder="请输入邮箱" autofocus>
            <Icon type="ios-mail" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-input type="text" v-model="userPhone" placeholder="请输入手机" autofocus>
            <Icon type="ios-call" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-button type="info" v-on:click=checkUser()>验证信息</i-button>
        </div>
      </div>
      <div v-show="showNewPassword" style="width: 20%;padding-top: 8%">
        <h2>设置新密码</h2>
        <div class="box">
          <i-input type="password" v-model="newPassword" size="large" placeholder="请输入新密码">
            <Icon type="ios-lock" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-button type="primary" v-on:click=changeUserPassword()>确认</i-button>
        </div>
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

export default {
  name: 'forgetPassword',
  components: {CommonFooter, MovieIndexHeader},
  data () {
    return {
      username: '',
      userMail: '',
      userPhone: '',
      newPassword: '',
      showNewPassword: false,
      showUserInfo: true
    }
  },
  methods: {
    checkUser: function (event) {
      this.$http.post('http://localhost:3000/users/findPassword', {username: this.username, userMail: this.userMail, userPhone: this.userPhone}).then((checkData) => {
        if (checkData.body.status === 0) {
          this.$Modal.success({
            title: checkData.body.message
          })
          // alert(checkData.body.message)
          this.showNewPassword = true
          this.showUserInfo = false
        } else {
          this.$Modal.error({
            title: checkData.body.message
          })
          // alert(checkData.body.message)
        }
      })
    },
    changeUserPassword: function (event) {
      this.$http.post('http://localhost:3000/users/findPassword', {username: this.username, userMail: this.userMail, userPhone: this.userPhone, newPassword: this.newPassword}).then((checkData) => {
        if (checkData.body.status === 0) {
          this.$Modal.success({
            title: checkData.body.message
          })
          // alert(checkData.body.message)
          this.$router.go(-1)
        } else {
          this.$Modal.error({
            title: checkData.body.message
          })
          // alert(checkData.body.message)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
  }
</style>
