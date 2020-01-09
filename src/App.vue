<template>
  <div id="app">
    <div class="container py-5">
      <router-view/>
    </div>
    <div class="replace"></div>
    <ActionBar />
  </div>
</template>

<script>
import ActionBar from '@/components/utility/ActionBar'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    ActionBar
  },
  mounted () {
    this.GET_ACCOUNT_DATA()
    this.GET_SAVE()
    this.GET_TODAY_DATA()
    this.GET_TYPE_LIST()
  },
  methods: {
    ...mapActions(['GET_ACCOUNT_DATA', 'GET_SAVE', 'GET_TYPE_LIST', 'GET_TODAY_DATA'])
  }
}
</script>

<style lang="scss" scoped>
  .replace{
    height: 100px;
  }
</style>
