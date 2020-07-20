<template>
<transition name="fade" appear>
<div class="cover-bg">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">重設存款</h5>
        <button type="button" class="close" @click="toggleResetPopup(false)"><span>&times;</span></button>
      </div>
      <div class="modal-body">
        請輸入您希望設定的存款金額
        <form>
          <div class="input-group mt-4">
            <div class="input-group-prepend"><span class="input-group-text">金額</span></div>
            <input type="text" class="form-control" id="cost" v-model.trim="$v.newSave.$model" @blur="$v.newSave.$touch">
            <div class="input-group-append"><span class="input-group-text">NT$</span></div>
          </div>
          <p class="error text-danger" v-if="!newSave && $v.newSave.$dirty">請輸入金額</p>
          <p class="error text-danger" v-if="!$v.newSave.numeric">請避免輸入非數字之符號</p>
          <p class="error text-danger" v-if="!$v.newSave.rex">請勿輸入以0為開頭之數字</p>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="toggleResetPopup(false)">取消</button>
        <button type="button" class="btn btn-danger" @click="resetSave()">確定</button>
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'ResetPopup',
  props: {
    term: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      newSave: ''
    }
  },
  validations: {
    newSave: {
      required,
      numeric,
      rex: (value) => {
        if (value === '' || value === '0') return true
        var rex = new RegExp(/^0/)
        return !rex.test(value)
      }
    }
  },
  methods: {
    ...mapActions(['RESET_SAVE']),
    toggleResetPopup (state) {
      this.$emit('toggleResetPopup', state)
    },
    resetSave () {
      this.$v.newSave.$touch()
      if (!this.$v.newSave.$invalid) {
        this.RESET_SAVE(this.newSave)
      }
      this.toggleResetPopup(false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .error{
    font-size: 14px;
    margin: 4px 0;
  }

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
