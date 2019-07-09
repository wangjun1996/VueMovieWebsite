<template lang="html">
  <div class="container">
    <div>
      <movie-index-header></movie-index-header>
    </div>
    <h2 style="padding-top: 6%">个人信息</h2>
    <Divider />
    <table align="center">
      <tr>
        <td>用户名：</td>
        <td>{{detail.username}}</td>
      </tr>
      <tr>
        <td>邮箱：</td>
        <td>{{detail.userMail}}</td>
      </tr>
      <tr>
        <td>电话：</td>
        <td>{{detail.userPhone}}</td>
      </tr>
      <tr>
        <td>用户身份：</td>
        <td>{{userAdmin}}</td>
      </tr>
      <tr>
        <td>用户状态：</td>
        <td>{{userStatus}}</td>
      </tr>
    </table>
<!--    <div>-->
<!--      <button v-on:click=showChangeUserPassword()>修改密码</button>-->
<!--    </div>-->
<!--    <div style="padding-top: 10px">-->
<!--      <router-link to="/sendEmail">-->
<!--        <button>发送站内信</button>-->
<!--      </router-link>-->
<!--    </div>-->
    <common-footer></common-footer>
  </div>
</template>

<script>
import MovieIndexHeader from '../components/MovieIndexHeader'
import UserMessage from '../components/UserMessage'
import CommonFooter from '../components/CommonFooter'
export default {
  name: 'userInfo',
  components: {CommonFooter, UserMessage, MovieIndexHeader},
  data () {
    return {
      detail: [],
      userStatus: '',
      userAdmin: ''
    }
  },
  // 获取用户数据
  created () {
    let userId = this.$route.query.id
    if (userId) {
      this.$http.post('http://localhost:3000/showUser', {user_id: userId}).then((userData) => {
        if (userData.body.status === 0) {
          this.detail = userData.body.data
          if (userData.body.data.userStop) {
            this.userStatus = '已被封停'
          } else {
            this.userStatus = '正常'
          }
          if (userData.body.data.userAdmin) {
            this.userAdmin = '管理员用户'
          } else {
            this.userAdmin = '普通用户'
          }
        } else {
          alert(userData.body.message)
        }
      })
    } else {
      alert('请先登录再查看个人信息')
    }
  }
}
</script>

<style lang="css" scoped>
  .container{
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
  }
  .box{
    display: inline-flex;
  }
</style>
