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
          <h2 style="padding-top: 20px; font-size: 24px">电影列表</h2>
          <Divider />
          <Table :loading="loadFlag" :columns="columns" :data="movieData" height="700" size="large" ref="table" border=true>
            <template slot-scope="{ row, index }" slot="_id">
              <Input type="text" v-model="editId" style="display: none;"/>
              <span>{{ row._id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieName">
              <Input type="text" v-model="editName" v-if="editIndex === index" />
<!--              <span v-else>{{ row.movieName }}</span>-->
              <span v-else>{{ row.movieName.length <= 18 ? row.movieName : row.movieName.substring(0, 18) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieImg">
              <Input type="text" v-model="editImg" v-if="editIndex === index" />
              <span v-else>{{ row.movieImg.length <= 25 ? row.movieImg : row.movieImg.substring(0, 25) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieVideo">
              <Input type="text" v-model="editVideo" v-if="editIndex === index" />
              <span v-else>{{ row.movieVideo.length <= 25 ? row.movieVideo : row.movieVideo.substring(0, 25) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieDownload">
              <Input type="text" v-model="editDownload" v-if="editIndex === index" />
              <span v-else>{{ row.movieDownload.length <= 25 ? row.movieDownload : row.movieDownload.substring(0, 25) + '...'}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieTime">
              <Input type="text" v-model="editTime" v-if="editIndex === index" />
              <span v-else>{{ row.movieTime }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieNumSuppose">
              <Input type="text" v-model="editNumSuppose" v-if="editIndex === index" />
              <span v-else>{{ row.movieNumSuppose }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieNumDownload">
              <Input type="text" v-model="editNumDownload" v-if="editIndex === index" />
              <span v-else>{{ row.movieNumDownload }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="movieMainPage">
              <Select v-model="editMainPage" style="width:95%" v-if="editIndex === index" >
                <Option v-for="item in mainPageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
<!--              <Input type="text" v-model="editMainPage" v-if="editIndex === index" />-->
              <span v-else>{{ row.movieMainPage }}</span>
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
                <textarea v-model="movieDetail" readonly autofocus rows="30" cols="160" style="font-size: 14px"></textarea>
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
import MovieIndexHeader from '../components/MovieIndexHeader'
import CommonFooter from '../components/CommonFooter'
import UserMessage from '../components/UserMessage'
import AdminMenu from '../components/AdminMenu'
export default {
  components: {AdminMenu, UserMessage, CommonFooter, MovieIndexHeader},
  data () {
    return {
      loadFlag: true,
      columns: [
        {
          title: '电影ID',
          slot: '_id'
        },
        {
          title: '电影名称',
          slot: 'movieName'
        },
        {
          title: '图片地址',
          slot: 'movieImg'
        },
        {
          title: '预告片地址',
          slot: 'movieVideo'
        },
        {
          title: '播放地址',
          slot: 'movieDownload'
        },
        {
          title: '上映时间',
          slot: 'movieTime'
        },
        {
          title: '点赞数',
          slot: 'movieNumSuppose'
        },
        {
          title: '下载数',
          slot: 'movieNumDownload'
        },
        {
          title: '主页显示',
          slot: 'movieMainPage',
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
              return row.movieMainPage === true
            } else {
              return row.movieMainPage === false
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
      movieDetail: '',
      movieData: [],
      editIndex: -1,  // 当前聚焦的输入框的行数
      editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editImg: '',  // 第二列输入框
      editVideo: '',  // 第三列输入框
      editDownload: '',
      editTime: '',
      editNumSuppose: '',
      editNumDownload: '',
      editMainPage: ''
    }
  },
  created () {
    // 获取电影列表
    this.$http.get('http://localhost:3000/admin/movie').then((data) => {
      this.movieData = data.body.data
      this.loadFlag = false
      console.log(data.body.data)
    })
  },
  methods: {
    handleEdit (row, index) {
      this.editId = row._id
      this.editName = row.movieName
      this.editImg = row.movieImg
      this.editVideo = row.movieVideo
      this.editDownload = row.movieDownload
      this.editTime = row.movieTime
      this.editNumSuppose = row.movieNumSuppose
      this.editNumDownload = row.movieNumDownload
      this.editMainPage = row.movieMainPage
      this.editIndex = index
    },
    handleSave (index) {
      // 从数据库修改电影
      let update_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        update_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          movie_id: this.editId,
          movieName: this.editName,
          movieImg: this.editImg,
          movieVideo: this.editVideo,
          movieDownload: this.editDownload,
          movieTime: this.editTime,
          movieNumSuppose: this.editNumSuppose,
          movieNumDownload: this.editNumDownload,
          movieMainPage: this.editMainPage
        }
        console.log(update_data)
        this.$http.post('http://localhost:3000/admin/movieUpdate', update_data).then((updateData) => {
          if (updateData.body.status === 0) {
            this.$Notice.success({
              title: updateData.body.message,
              duration: 3,
              top: 150
            })
            // this.$Modal.success({
            //   title: updateData.body.message
            // })
            // 从页面电影修改电影
            this.movieData[index].movieName = this.editName
            this.movieData[index].movieImg = this.editImg
            this.movieData[index].movieVideo = this.editVideo
            this.movieData[index].movieDownload = this.editDownload
            this.movieData[index].movieTime = this.editTime
            this.movieData[index].movieNumSuppose = this.editNumSuppose
            this.movieData[index].movieNumDownload = this.editNumDownload
            this.movieData[index].movieMainPage = this.editMainPage
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
      this.movieDetail = ` 电影名称：${this.movieData[index].movieName}\n\n 图片地址：${this.movieData[index].movieImg}\n\n 预告片：${this.movieData[index].movieVideo}\n\n 观看地址：${this.movieData[index].movieDownload}\n\n 上映时间：${this.movieData[index].movieTime}\n\n 点赞数量：${this.movieData[index].movieNumSuppose}\n\n 观看数量：${this.movieData[index].movieNumDownload}\n\n 主页显示：${this.movieData[index].movieMainPage}`
      this.showDetail = true
      // this.$Modal.info({
      //   width: 600,
      //   title: '详细信息',
      //   fullscreenable: true,
      //   content: `电影名称：${this.movieData[index].movieName}<br>图片地址：${this.movieData[index].movieImg}<br>预告片：${this.movieData[index].movieVideo}<br>上映时间：${this.movieData[index].movieTime}<br>点赞数量：${this.movieData[index].movieNumSuppose}<br>观看数量：${this.movieData[index].movieNumDownload}<br>主页显示：${this.movieData[index].movieMainPage}`
      // })
    },
    remove (index) {
      // 从数据库删除电影
      let send_data;
      if (typeof (sessionStorage.username) !== 'undefined') {
        send_data = {
          username: sessionStorage.username,
          token: sessionStorage.token,
          user_id: sessionStorage._id,
          movie_id: this.movieData[index]._id
        }
        this.$Modal.confirm({
          title: '确认删除此条数据吗？',
          onOk: () => {
            this.$http.post('http://localhost:3000/admin/movieDel', send_data).then((delData) => {
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
            // 从页面删除电影
            this.movieData.splice(index, 1)
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
