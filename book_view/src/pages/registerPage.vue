<template lang="html">
  <div>
    <div class="container">
      <movie-index-header></movie-index-header>
    </div>
    <div class="box">
      <div style="width: 20%;padding-top: 8%">
        <h2>用户注册</h2>
        <div class="box">
          <i-input type="text" v-model="username" placeholder="请输入用户名" autofocus>
            <Icon type="ios-person" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-input type="password" v-model="password" placeholder="请输入密码">
            <Icon type="ios-lock" slot="prepend"></Icon>
          </i-input>
        </div>
        <div class="box">
          <i-input type="password" v-model="rePasswprd" placeholder="请再次输入密码">
            <Icon type="ios-lock" slot="prepend"></Icon>
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
          <i-button type="success" v-on:click=userRegister() style="margin-left: 10px">注册</i-button>
          <!--      <button v-on:click=userRegister()>注册</button>-->
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
  name: 'registerPage',
  components: {CommonFooter, MovieIndexHeader},
  data () {
    return {
      username: '',
      password: '',
      rePasswprd: '',
      userMail: '',
      userPhone: ''
    }
  },
  methods: {
    userRegister: function (event) {
      if (this.password !== this.rePasswprd) {
        this.$Modal.error({
          title: '两次密码不一致'
        })
        // alert('两次密码不一致')
      } else {
        let sendData = {
          username: this.username,
          password: this.password,
          userMail: this.userMail,
          userPhone: this.userPhone
        }
        this.$http.post('http://localhost:3000/users/register', sendData).then((registerData) => {
          if (registerData.body.status === 1) {
            this.$Modal.error({
              title: '注册失败',
              content: registerData.body.message
            })
            // alert(registerData.body.message)
          } else {
            this.$Modal.success({
              title: registerData.body.message
            })
            // alert(registerData.body.message)
            this.$router.go(-1)
          }
        })
      }
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
  .container{
    width: 100%;
    margin: 0 auto;
  }
</style>
