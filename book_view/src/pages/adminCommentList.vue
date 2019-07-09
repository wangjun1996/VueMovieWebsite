<template>
  <div>
    <!--    <movie-index-header></movie-index-header>-->
    <div>
      <user-message></user-message>
    </div>
    <div>
      <Row>
        <i-col span="2" offset="0">
          <admin-menu></admin-menu>
        </i-col>
        <i-col span="20" offset="1">
          <h2 style="padding-top: 20px; font-size: 24px">评论列表</h2>
          <Divider />
          <Table :loading="loadFlag" :columns="columns" :data="commentData" height="700" size="large" ref="table" border=true>
            <template slot-scope="{ row, index }" slot="_id">
              <Input type="text" v-model="editId" style="display: none;"/>
              <span>{{ row._id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movie_id">
              <Input type="text" v-model="editMovieId" v-if="editIndex === index" />
<!--              <span v-else>{{ row.movieName }}</span>-->
              <span v-else>{{ row.movie_id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="username">
              <Input type="text" v-model="editUserName" v-if="editIndex === index" />
              <span v-else>{{ row.username.length <= 30 ? row.username : row.username.substring(0, 30) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="context">
              <Input type="text" v-model="editContext" v-if="editIndex === index" />
              <span v-else>{{ row.context.length <= 45 ? row.context : row.context.substring(0, 45) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="check">
              <Input type="text" v-model="editCheck" v-if="editIndex === index" />
              <span v-else>{{ row.check }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <div>
                <Button @click="handleCheck(row, index)" v-if="row.check === false" style="color: green">审核</Button>
                <Button @click="handleCheck(row, index)" disabled=true v-else>已审核</Button>
              </div>
            </template>
          </Table>
          <template>
            <Modal v-model="showDetail" fullscreen footer-hide title="详细信息">
              <div align="center">
                <textarea v-model="commentDetail" readonly autofocus rows="30" cols="160" style="font-size: 14px"></textarea>
              </div>
            </Modal>
          </template>
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
      loadFlag: true,
      columns: [
        {
          title: '评论编号',
          slot: '_id',
          width: 150
        },
        {
          title: '评论的电影ID',
          slot: 'movie_id',
          width: 150
        },
        {
          title: '评论用户',
          slot: 'username',
          width: 150
        },
        {
          title: '评论内容',
          slot: 'context'
        },
        {
          title: '是否审核',
          slot: 'check',
          width: 115,
          filters: [
            {
              label: 'true',
              value: 'true'
            },
            {
              label: 'false',
              value: 'false'
            }
          ],
          filterMethod (value, row) {
            if (value === 'true') {
              return row.check === true
            } else {
              return row.check === false
            }
          }
        },
        {
          title: '审核',
          slot: 'action',
          width: 115
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      showDetail: false,
      commentDetail: '',
      commentData: [],
      editIndex: -1,  // 当前聚焦的输入框的行数
      editId: '',  // 第一列输入框
      editMovieId: '',  // 第二列输入框
      editUserName: '',
      editContext: '',
      editCheck: ''
    }
  },
  created () {
    // 获取影评列表
    this.$http.get('http://localhost:3000/admin/commentList').then((data) => {
      this.commentData = data.body.data
      this.loadFlag = false
      console.log(data.body.data)
    })
  },
  methods: {
    handleCheck (row, index) {
      // 从数据库审核评论
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          comment_id: this.commentData[index]._id
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/checkComment', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // 从页面修改评论
            this.commentData[index].check = 'true'
            this.editIndex = -1
          } else {
            this.$Modal.error({
              title: updateData.body.message
            })
          }
        })
      } else {
        this.$Modal.error({
          title: '请先登录'
        })
      }
    },
    show (index) {
      this.commentDetail = ` 评论编号：${this.commentData[index]._id}\n\n 评论的电影ID：${this.commentData[index].movie_id}\n\n 评论用户：${this.commentData[index].username}\n\n 评论内容：${this.commentData[index].context}\n\n 是否审核：${this.commentData[index].check}`
      this.showDetail = true
    },
    remove (index) {
      // 从数据库删除评论
      let send_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        send_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          comment_id: this.commentData[index]._id
        }
        this.$Modal.confirm({
          title: '确认删除此条数据吗？',
          onOk: () => {
            this.$http.post('http://localhost:3000/admin/delComment', send_data).then((delData) => {
              if (delData.body.status === 0) {
                this.$Notice.success({
                  title: delData.body.message,
                  duration: 3,
                  top: 150
                })
              } else {
                this.$Modal.error({
                  title: delData.body.message
                })
              }
            })
            // 从页面删除评论
            this.commentData.splice(index, 1)
          },
          onCancel: () => {
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

</style>
