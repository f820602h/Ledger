<template>
  <transition name="fade" appear>
    <div class="cover-bg">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">註冊帳號</h5>
            <button type="button" class="close" @click="toggleSignUpPopup(false)">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group">
              <div class="input-group-prepend"><span class="input-group-text">名稱</span></div>
              <input
                type="text"
                class="form-control"
                placeholder="請輸入用戶名稱(暱稱)"
                v-model.trim="$v.signUpForm.name.$model"
              />
            </div>
            <template v-if="$v.signUpForm.password.$dirty">
              <p class="error text-danger" v-if="!signUpForm.name">請輸入用戶名稱(暱稱)</p>
            </template>

            <div class="input-group mt-4">
              <div class="input-group-prepend"><span class="input-group-text">存款</span></div>
              <input
                type="text"
                class="form-control"
                placeholder="請輸入您目前存款金額"
                v-model.trim="$v.signUpForm.save.$model"
              />
              <div class="input-group-append"><span class="input-group-text">NT$</span></div>
            </div>
            <template v-if="$v.signUpForm.account.$dirty">
              <p class="error text-danger" v-if="!signUpForm.save">請輸入金額</p>
              <p class="error text-danger" v-if="!$v.signUpForm.save.numeric">
                請避免輸入非數字之符號
              </p>
              <p class="error text-danger" v-if="!$v.signUpForm.save.rex">
                請勿輸入以0為開頭之數字
              </p>
            </template>

            <div class="input-group mt-4">
              <div class="input-group-prepend"><span class="input-group-text">帳號</span></div>
              <input
                type="text"
                class="form-control"
                placeholder="電子信箱"
                v-model.trim="$v.signUpForm.account.$model"
              />
            </div>
            <template v-if="$v.signUpForm.account.$dirty">
              <p class="error text-danger" v-if="!signUpForm.account">請輸入您的電子信箱</p>
              <p class="error text-danger" v-if="!$v.signUpForm.account.email">
                請輸入正確的信箱格式
              </p>
            </template>

            <div class="input-group mt-4">
              <div class="input-group-prepend"><span class="input-group-text">密碼</span></div>
              <input
                type="password"
                class="form-control"
                placeholder="六位以上英文或數字"
                v-model.trim="$v.signUpForm.password.$model"
              />
            </div>
            <template v-if="$v.signUpForm.password.$dirty">
              <p class="error text-danger" v-if="!signUpForm.password">請輸入您要設定的密碼</p>
              <p class="error text-danger" v-if="!$v.signUpForm.password.alphaNum">
                僅接受英文和數字
              </p>
              <p class="error text-danger" v-if="!$v.signUpForm.password.minLength">
                密碼長度至少要六位
              </p>
            </template>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleSignUpPopup(false)">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="signUp()">註冊</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { required, email, numeric, alphaNum, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "EditPopup",
  data() {
    return {
      signUpForm: {
        name: "",
        save: "",
        account: "",
        password: ""
      }
    };
  },
  validations: {
    signUpForm: {
      name: {
        required
      },
      save: {
        required,
        numeric,
        rex: value => {
          if (value === "" || value === "0") return true;
          var rex = new RegExp(/^0/);
          return !rex.test(value);
        }
      },
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
    ...mapActions(["SIGNUP"]),
    toggleSignUpPopup(state) {
      this.$emit("toggleSignUpPopup", state);
    },
    signUp() {
      this.$v.signUpForm.$touch();
      if (!this.$v.signUpForm.$invalid) {
        this.SIGNUP(this.signUpForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  font-size: 14px;
  margin: 4px 0;
}
.cover-bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
