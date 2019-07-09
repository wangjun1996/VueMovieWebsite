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
          <h2 style="padding-top: 20px; font-size: 24px">影评列表</h2>
          <Divider />
          <Table :loading="loadFlag" :columns="columns" :data="articleData" height="700" size="large" ref="table" border=true>
            <template slot-scope="{ row, index }" slot="_id">
              <Input type="text" v-model="editId" style="display: none;"/>
              <span>{{ row._id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="articleTitle">
              <Input type="text" v-model="editTitle" v-if="editIndex === index" />
<!--              <span v-else>{{ row.movieName }}</span>-->
              <span v-else>{{ row.articleTitle.length <= 18 ? row.articleTitle : row.articleTitle.substring(0, 18) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="articleContext">
              <Input type="text" v-model="editContext" v-if="editIndex === index" />
              <span v-else>{{ row.articleContext.length <= 30 ? row.articleContext : row.articleContext.substring(0, 30) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="articleTime">
              <Input type="text" v-model="editTime" v-if="editIndex === index" />
              <span v-else>{{ row.articleTime }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="articleMainPage">
              <Select v-model="editMainPage" style="width:95%" v-if="editIndex === index" >
                <Option v-for="item in mainPageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
<!--              <Input type="text" v-model="editMainPage" v-if="editIndex === index" />-->
              <span v-else>{{ row.articleMainPage }}</span>
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
                <textarea v-model="articleDetail" readonly autofocus rows="30" cols="160" style="font-size: 14px"></textarea>
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
          title: '影评ID',
          slot: '_id',
          width: 150
        },
        {
          title: '影评标题',
          slot: 'articleTitle',
          width: 320
        },
        {
          title: '影评内容',
          slot: 'articleContext'
        },
        {
          title: '发布时间',
          slot: 'articleTime',
          width: 170
        },
        {
          title: '主页显示',
          slot: 'articleMainPage',
          width: 120,
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
              return row.articleMainPage === true
            } else {
              return row.articleMainPage === false
            }
          }
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
      mainPageList: [
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
      articleDetail: '',
      articleData: [],
      editIndex: -1,  // 当前聚焦的输入框的行数
      editTitle: '',  // 第一列输入框
      editContext: '',  // 第二列输入框
      editTime: '',
      editMainPage: ''
    }
  },
  created () {
    // 获取影评列表
    this.$http.get('http://localhost:3000/admin/article').then((data) => {
      this.articleData = data.body.data
      this.loadFlag = false
      console.log(data.body.data)
    })
  },
  methods: {
    handleEdit (row, index) {
      this.editId = row._id
      this.editTitle = row.articleTitle
      this.editContext = row.articleContext
      this.editTime = row.articleTime
      this.editMainPage = row.articleMainPage
      this.editIndex = index
    },
    handleSave (index) {
      // 从数据库修改影评
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          article_id: this.editId,
          articleTitle: this.editTitle,
          articleContext: this.editContext,
          articleTime: this.editTime,
          articleMainPage: this.editMainPage
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/articleUpdate', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // this.$Modal.success({
            //   title: updateData.body.message
            // })
            // 从页面影评修改影评
            this.articleData[index].articleTitle = this.editTitle
            this.articleData[index].articleContext = this.editContext
            this.articleData[index].articleTime = this.editTime
            this.articleData[index].articleMainPage = this.editMainPage
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
      this.articleDetail = ` 影评名称：${this.articleData[index].articleTitle}\n\n 影评内容：${this.articleData[index].articleContext}\n\n 发布时间：${this.articleData[index].articleTime}\n\n 主页显示：${this.articleData[index].articleMainPage}`
      this.showDetail = true
    },
    remove (index) {
      // 从数据库删除影评
      let send_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        send_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          article_id: this.articleData[index]._id
        }
        this.$Modal.confirm({
          title: '确认删除此条数据吗？',
          onOk: () => {
            this.$http.post('http://localhost:3000/admin/delArticle', send_data).then((delData) => {
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
            // 从页面删除影评
            this.articleData.splice(index, 1)
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
