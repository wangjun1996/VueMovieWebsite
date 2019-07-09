<template lang="html">
  <div>
    <br>
    <Divider>已审核的评论</Divider>
<!--    <h3>已审核的评论</h3>-->
    <div class="comment">
      <li v-for="item in items">
        {{ item.username }} : {{ item.context }}
      </li>
    </div>
    <div style="padding: 5px">
<!--      <i-input v-model="context" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入评论..." />-->
      <textarea v-model="context" style="width:40%;height: 60px;" placeholder="请输入评论"></textarea>
    </div>
    <div style="padding-top: 5px;">
      <i-button type="success" v-on:click=send_comment() style="margin-left: 10px">评论</i-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['movie_id'],
  data () {
    return {
      items: [],
      context: ''
    }
  },
  created () {
    // 获取所有的评论
    this.$http.post('http://localhost:3000/users/showComment', {movie_id: this.movie_id}).then((commentData) => {
      if (commentData.body.status === 0) {
        this.items = commentData.body.data
      } else {
        alert('评论获取失败')
      }
    })
  },
  methods: {
    send_comment (event) {
      let send_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        send_data = {
          movie_id: this.movie_id,
          context: this.context,
          username: sessionStorage.username
        }
      } else {
        send_data = {
          movie_id: this.movie_id,
          context: this.context
        }
      }
      // 提交评论
      this.$http.post('http://localhost:3000/users/postComment', send_data).then((postData) => {
        if (postData.body.status === 0) {
          this.$Modal.success({
            title: postData.body.message
          })
          // alert(postData.body.message)
          this.context = ''
        } else {
          this.$Modal.error({
            title: postData.body.message
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.comment{
  font-size: 13px;
}
</style>
