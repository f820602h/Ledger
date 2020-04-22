<template>
  <div class="login d-flex justify-content-center align-items-center mt-5">
    <div class="con d-flex flex-column justify-content-center align-items-center bg-white px-4 py-5 rounded shadow">
      <h4 class="text-center">歡迎使用記帳本</h4>
      <p class="text-center">請先登入</p>
      <div class="input-group mt-4">
        <div class="input-group-prepend"><span class="input-group-text">帳號</span></div>
        <input type="text" class="form-control" id="account" placeholder="電子信箱" v-model="$v.loginform.account.$model">
      </div>
      <div class="input-group mt-4">
        <div class="input-group-prepend"><span class="input-group-text">密碼</span></div>
        <input type="password" class="form-control" id="password" placeholder="密碼" v-model="$v.loginform.password.$model" @keydown.enter="login">
      </div>
      <p class="error text-danger mt-3" v-if="$v.loginform.$invalid && $v.loginform.$dirty">請填妥您的帳號及密碼</p>
      <button class="btn btn-sm btn-info mt-4 mx-auto" @click="login">登入</button>
      <a href="#" class="badge mt-2" @click="toggleSignUpPopup(true)">註冊帳號</a>
    </div>
    <SignUpPopup v-if="signUpPopupIsShow" @toggleSignUpPopup="toggleSignUpPopup" />
  </div>
</template>

<script>
import SignUpPopup from '@/components/utility/SignUpPopup'
import { required, email, alphaNum } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginform: {
        account: '',
        password: ''
      },
      signUpPopupIsShow: false
    }
  },
  validations: {
    loginform: {
      account: {
        required,
        email
      },
      password: {
        required,
        alphaNum
      }
    }
  },
  components: {
    SignUpPopup
  },
  computed: {
    ...mapState(['loginState', 'today', 'alertObj'])
  },
  watch: {
    loginState (value) {
      if (value) this.$router.push(`/daily/${this.today}`)
    },
    alertObj (value) {
      this.$message(value)
    }
  },
  methods: {
    ...mapActions(['LOGIN']),
    toggleSignUpPopup (state) {
      this.signUpPopupIsShow = state
    },
    login () {
      this.$v.loginform.$touch()
      if (!this.$v.loginform.$invalid) {
        this.LOGIN(this.loginform)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  min-width: 350px;
}
.error {
  font-size: 14px;
  margin: 4px 0;
}
</style>
