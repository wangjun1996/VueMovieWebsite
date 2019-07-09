<template>
  <div>
    <Menu theme="light" open-names="['0', '1', '2', '3', '4']" width="180px">
      <br><br>
      <Submenu name="0">
        <template slot="title">
          <Icon type="ios-people" />
          管理中心
        </template>
        <router-link :to="{path: '/admin', query: {id: id}}">
          <MenuItem name="0-1">个人信息</MenuItem>
        </router-link>
      </Submenu>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper" />
          电影管理
        </template>
        <router-link :to="{path: '/adminMovieList'}">
          <MenuItem name="1-1">电影列表</MenuItem>
        </router-link>
        <router-link :to="{path: '/adminAddMovie'}">
          <MenuItem name="1-2">添加电影</MenuItem>
        </router-link>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people" />
          影评管理
        </template>
        <router-link :to="{path: '/adminArticleList'}">
          <MenuItem name="2-1">影评列表</MenuItem>
        </router-link>
        <router-link :to="{path: '/adminAddArticle'}">
          <MenuItem name="2-2">添加影评</MenuItem>
        </router-link>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          评论管理
        </template>
        <router-link :to="{path: '/adminCommentList'}">
          <MenuItem name="3-1">评论列表</MenuItem>
        </router-link>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-people" />
          用户管理
        </template>
        <router-link :to="{path: '/adminUserList'}">
          <MenuItem name="4-1">用户列表</MenuItem>
        </router-link>
      </Submenu>
      <br><br><br><br><br><br><br><br>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'AdminMenu',
  created () {
    let token = sessionStorage.getItem('token')
    if (token) {
      this.id = sessionStorage.getItem('_id')
    } else {
      console.log('用户登录失败')
    }
  }
}
</script>

<style scoped>

</style>
