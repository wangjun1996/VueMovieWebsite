<template>
  <div>
    <div>
      <user-message></user-message>
    </div>
    <div>
      <Row>
        <i-col span="2" offset="0">
          <admin-menu></admin-menu>
        </i-col>
        <i-col span="20" offset="1">
          <div class="box">
          <div style="width: 800px;padding-top: 6%; alignment: center">
            <h2>添加影评</h2>
            <Divider />
              <table>
                <tr>
                  <td>影评标题：</td>
                  <td>
                    <i-input type="text" v-model="articleTitle" placeholder="请输入影评标题" autofocus  size="large" clearable style="width: 600px">
                      <Icon type="ios-person" slot="prepend"></Icon>
                    </i-input>
                  </td>
                </tr>
                <tr>
                  <td>影评内容：</td>
                  <td>
                    <Input v-model="articleContext" type="textarea" :autosize="{minRows: 8, maxRows: 15}" placeholder="请输入影评内容" />
                  </td>
                </tr>
                <tr style="height: 40px;">
                  <td>是否在主页显示该影评：</td>
                  <td>
                    <RadioGroup v-model="articleMainPage" size="large">
                      <Radio label="false">否</Radio>
                      <Radio label="true">是</Radio>
                    </RadioGroup>
                  </td>
                </tr>
                <br>
                <tr>
                  <td colspan="2">
                    <i-button type="success" v-on:click=addArticle() style="margin-left: 30px; width: 100px">添加</i-button>
                  </td>
                </tr>
              </table>
          </div>
          </div>
        </i-col>
      </Row>
    </div>
    <div>
      <common-footer></common-footer>
    </div>
  </div>
</template>

<script>

import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'
import AdminMenu from '../components/AdminMenu'
export default {
  components: {AdminMenu, UserMessage, CommonFooter},
  data () {
    return {
      articleTitle: '',
      articleContext: '',
      articleMainPage: 'false'
    }
  },
  methods: {
    addArticle: function (event) {
      // 添加影评到数据库
      let article_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        article_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          articleTitle: this.articleTitle,
          articleContext: this.articleContext,
          movieMainPage: this.movieMainPage
        }
        console.log(article_data)
        this.$http.post('http://localhost:3000/admin/addArticle', article_data).then((addData) => {
          if (addData.body.status === 0) {
            this.$Modal.success({
              title: addData.body.message
            })
            this.articleTitle = ''
            this.articleContext = ''
            this.movieMainPage = ''
          } else {
            this.$Modal.error({
              title: addData.body.message
            })
          }
        })
      } else {
        this.$Modal.error({
          title: '请先登录'
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
    font-size: 16px;
  }
  td{
    height: 60px;
  }
</style>
