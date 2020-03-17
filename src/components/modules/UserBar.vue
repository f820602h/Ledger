<template>
  <div class="userBar container pt-4">
    <span class="font-weight-bold">Hi ! {{ user }}</span> | <span class="logout" @click="logout">登出</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'UserBar',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['LOGOUT']),
    logout () {
      this.LOGOUT()
    }
  }
}
</script>

<style lang="scss" scoped>
  .userBar{
    font-size: 14px;
    .logout{
      color: #17a2b8;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        color: #0d6c7a;
      }
    }
  }
</style>
