<template>
<transition name="fade" appear>
<div class="cover-bg">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">刪除帳目</h5>
        <button type="button" class="close" @click="toggleDelePopup(false)"><span>&times;</span></button>
      </div>
      <div class="modal-body">
        確定要刪除此筆帳目嗎？
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="toggleDelePopup(false)">取消</button>
        <button type="button" class="btn btn-danger" @click="deleData()">刪除</button>
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DelePopup',
  props: {
    term: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['DELE_DATA']),
    toggleDelePopup (state) {
      this.$emit('toggleDelePopup', state)
    },
    deleData () {
      this.DELE_DATA(this.term)
      this.toggleDelePopup(false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .cover-bg{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s linear;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
