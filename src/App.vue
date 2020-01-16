<template>
  <div id="app">
    <div class="container py-5">
      <router-view/>
    </div>
    <div class="replace"></div>
    <ActionBar @toggleModal="toggleModal"/>
    <Modal v-if="isShow" @toggleModal="toggleModal"/>
  </div>
</template>

<script>
import ActionBar from '@/components/utility/ActionBar'
import Modal from '@/components/utility/Modal'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      isShow: false
    }
  },
  components: {
    ActionBar,
    Modal
  },
  mounted () {
    this.INIT_DATA()
  },
  methods: {
    ...mapActions(['INIT_DATA']),
    toggleModal (state) {
      this.isShow = state
      document.body.style.overflow = state ? 'hidden' : ''
    }
  }
}
</script>

<style lang="scss">
  body, html{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  button{
    outline: none !important;
  }
  button:focus{
    outline: none !important;
  }
</style>
<style lang="scss" scoped>
  .replace{
    height: 100px;
  }
</style>
