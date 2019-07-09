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
          <h2 style="padding-top: 20px; font-size: 24px">用户列表</h2>
          <Divider />
          <Table :loading="loadFlag" :columns="columns" :data="userData" height="700" size="large" ref="table" border=true>
            <template slot-scope="{ row, index }" slot="_id">
              <span>{{ row._id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="username">
              <span>{{ row.username.length <= 18 ? row.username : row.username.substring(0, 18) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="password">
              <span>{{ row.password.length <= 30 ? row.password : row.password.substring(0, 25) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="userMail">
              <span>{{ row.userMail }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="userPhone">
              <span>{{ row.userPhone }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="userAdmin">
              <Select v-model="editAdmin" style="width:95%" v-if="editIndex === index" >
                <Option v-for="item in adminList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
<!--              <Input type="text" v-model="editAdmin" v-if="editIndex === index" />-->
              <span v-else>{{ row.userAdmin }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="userPower">
              <Select v-model="editPower" style="width:95%" v-if="editIndex === index" >
                <Option v-for="item in powerList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
<!--              <Input type="text" v-model="editPower" />-->
              <span v-else>{{ row.userPower }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="userStop">
              <span>{{ row.userStop }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="stop">
              <div>
                <Button @click="handleStop(row, index)" v-if="row.userStop === false" style="color: red">封停</Button>
                <Button @click="handleCancelStop(row, index)" v-if="row.userStop === true" style="color: green">解封</Button>
              </div>
            </template>

            <template slot-scope="{ row, index }" slot="action">
              <div v-if="editIndex === index">
                <Button @click="handleSave(index)" style="color: green;">保存</Button>
                <Button @click="editIndex = -1" style="color: red;">取消</Button>
              </div>
              <div v-else>
                <Button @click="handleEdit(row, index)">编辑</Button>
              </div>
            </template>
          </Table>
          <template>
            <Modal v-model="showDetail" fullscreen footer-hide title="详细信息">
              <div align="center">
                <textarea v-model="userDetail" readonly autofocus rows="30" cols="160" style="font-size: 14px"></textarea>
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
          title: '用户ID',
          slot: '_id'
        },
        {
          title: '用户名称',
          slot: 'username'
        },
        {
          title: '用户密码',
          slot: 'password'
        },
        {
          title: '用户邮箱',
          slot: 'userMail'
        },
        {
          title: '用户电话',
          slot: 'userPhone'
        },
        {
          title: '是否管理员',
          slot: 'userAdmin',
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
              return row.userAdmin === true
            } else {
              return row.userAdmin === false
            }
          }
        },
        {
          title: '用户权限',
          slot: 'userPower'
        },
        {
          title: '是否封停',
          slot: 'userStop',
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
              return row.userStop === true
            } else {
              return row.userStop === false
            }
          }
        },
        {
          title: '封停/解封',
          slot: 'stop',
          width: 100
        },
        {
          title: '编辑',
          slot: 'action',
          width: 160
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
      powerList: [
        {
          value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        }
      ],
      adminList: [
        {
          value: 'true',
          label: 'true'
        },
        {
          value: 'false',
          label: 'false'
        }
      ],
      showDetail: false,
      userDetail: '',
      userData: [],
      editIndex: -1,  // 当前聚焦的输入框的行数
      editName: '',  // 第一列输入框
      editPassword: '',  // 第二列输入框
      editMail: '',
      editPhone: '',
      editAdmin: '',
      editPower: '',
      editStop: ''
    }
  },
  created () {
    // 获取用户列表
    let user_data = {
      username: sessionStorage.username,
      token: sessionStorage.token,
      user_id: sessionStorage._id
    }
    this.$http.post('http://localhost:3000/admin/showUser', user_data).then((data) => {
      this.userData = data.body.data
      this.loadFlag = false
      console.log(data.body.data)
    })
  },
  methods: {
    handleStop (row, index) {
      // 从数据库封禁用户
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        if (sessionStorage.username === this.userData[index].username) {
          this.$Modal.error({
            title: '不能封禁自己的账户'
          })
          return
        }
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          stopUser_id: this.userData[index]._id
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/stopUser', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // 从页面修改评论
            this.userData[index].userStop = 'true'
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
    handleCancelStop (row, index) {
      // 从数据库解封用户
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          cancelStopUser_id: this.userData[index]._id
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/cancelStopUser', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // 从页面修改评论
            this.userData[index].userStop = 'false'
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
    handleEdit (row, index) {
      this.editAdmin = row.userAdmin
      this.editPower = row.userPower
      this.editIndex = index
    },
    handleSave (index) {
      // 从数据库修改用户权限
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          updateUser_id: this.userData[index]._id,
          userAdmin: this.editAdmin,
          userPower: this.editPower
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/updatePower', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // 从页面用户修改用户权限
            this.userData[index].userAdmin = this.editAdmin
            this.userData[index].userPower = this.editPower
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
      this.userDetail = ` 用户ID：${this.userData[index]._id}\n\n 用户名称：${this.userData[index].username}\n\n 用户密码：${this.userData[index].password}\n\n 用户邮箱：${this.userData[index].userMail}\n\n 用户电话：${this.userData[index].userPhone}\n\n 是否管理员：${this.userData[index].userAdmin}\n\n 用户权限：${this.userData[index].userPower}\n\n 是否封停：${this.userData[index].userStop}`
      this.showDetail = true
    },
    remove (index) {
      // 从数据库删除用户
      let send_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        send_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          deleteUser_id: this.userData[index]._id
        }
        this.$Modal.confirm({
          title: '确认删除此条数据吗？',
          onOk: () => {
            this.$http.post('http://localhost:3000/admin/delUser', send_data).then((delData) => {
              if (delData.body.status === 0) {
                this.$Notice.success({
                  title: delData.body.message,
                  duration: 3,
                  top: 150
                })
                // 从页面删除用户
                this.userData.splice(index, 1)
              } else {
                this.$Modal.error({
                  title: delData.body.message
                })
              }
            })
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
