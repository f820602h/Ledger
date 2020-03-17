<template>
  <transition name="fade" appear>
    <div class="cover-bg">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">註冊帳號</h5>
            <button type="button" class="close" @click="toggleSignUpPopup(false)"><span>&times;</span></button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <div class="input-group-prepend"><span class="input-group-text">帳號</span></div>
              <input type="text" class="form-control" placeholder="電子信箱" v-model.trim="$v.signupform.account.$model">
            </div>
            <template v-if="$v.signupform.account.$dirty">
              <p class="error text-danger" v-if="!signupform.account">請輸入您的電子信箱</p>
              <p class="error text-danger" v-if="$v.signupform.account.email">請輸入正確的信箱格式</p>
            </template>

            <div class="input-group mt-4">
              <div class="input-group-prepend"><span class="input-group-text">密碼</span></div>
              <input type="password" class="form-control" placeholder="六位以上英文或數字" v-model.trim="$v.signupform.password.$model">
            </div>
            <template v-if="$v.signupform.password.$dirty">
              <p class="error text-danger" v-if="!signupform.password">請輸入您要設定的密碼</p>
              <p class="error text-danger" v-if="$v.signupform.password.alphaNum">僅接受英文和數字</p>
              <p class="error text-danger" v-if="$v.signupform.password.minLength">密碼長度至少要六位</p>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleSignUpPopup(false)">取消</button>
            <button type="button" class="btn btn-danger" @click="signUp()">註冊</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { required, email, alphaNum, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
export default {
  name: 'EditPopup',
  data () {
    return {
      signupform: {
        account: '',
        password: ''
      }
    }
  },
  validations: {
    signupform: {
      account: {
        required,
        email
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    ...mapActions(['SIGNUP']),
    toggleSignUpPopup (state) {
      this.$emit('toggleSignUpPopup', state)
    },
    signUp () {
      this.$v.signupform.$touch()
      if (!this.$v.signupform.$invalid) {
        this.SIGNUP(this.signupform)
      }
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
