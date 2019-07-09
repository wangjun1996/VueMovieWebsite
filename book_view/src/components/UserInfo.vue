<template>
  <div class="container">
    <h2>个人信息</h2>
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
        <td>用户权限：</td>
        <td>{{userPower}}</td>
      </tr>
      <tr>
        <td>用户状态：</td>
        <td>{{userStatus}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      detail: [],
      userStatus: '',
      userAdmin: '',
      userPower: ''
    }
  },
  // 获取用户数据
  created () {
    let userId = this.$route.query.id
    if (userId) {
      this.$http.post('http://localhost:3000/showUser', {user_id: userId}).then((userData) => {
        if (userData.body.status === 0) {
          this.detail = userData.body.data
          console.log(userData.body.data)
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
          if (userData.body.data.userPower === 1) {
            this.userPower = '普通管理员'
          } else {
            this.userPower = '超级管理员'
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

<style scoped>
  .container{
    width: 600px;
    margin: 0 auto;
    font-size: 16px;
    padding-top: 6%;
  }
</style>
