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
          <user-info></user-info>
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
import UserInfo from '../components/UserInfo'
import AdminMenu from '../components/AdminMenu'
export default {
  name: 'admin',
  components: {AdminMenu, UserInfo, UserMessage, CommonFooter, MovieIndexHeader}
}
</script>

<style scoped>

</style>
