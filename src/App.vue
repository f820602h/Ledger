<template>
  <div id="app">
    <div class="container py-5">
      <router-view/>
    </div>
    <div class="replace"></div>
    <ActionBar @toggleAddPopup="toggleAddPopup"/>
    <AddPopup v-if="AddPopupIsShow" @toggleAddPopup="toggleAddPopup"/>
  </div>
</template>

<script>
import ActionBar from '@/components/utility/ActionBar'
import AddPopup from '@/components/utility/AddPopup'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      AddPopupIsShow: false
    }
  },
  components: {
    ActionBar,
    AddPopup
  },
  mounted () {
    this.INIT_DATA()
  },
  methods: {
    ...mapActions(['INIT_DATA']),
    toggleAddPopup (state) {
      this.AddPopupIsShow = state
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
