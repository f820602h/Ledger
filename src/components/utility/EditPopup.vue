<template>
  <transition name="fade" appear>
    <div class="cover-bg">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">編輯帳目</h5>
            <button type="button" class="close" @click="toggleEditPopup(false)">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">日期</span></div>
                <input
                  type="text"
                  class="form-control"
                  id="date"
                  placeholder="YYYY/MM/DD"
                  v-model.trim="$v.newData.date.$model"
                />
              </div>
              <p class="error text-danger" v-if="!newData.date && $v.newData.$dirty">請輸入日期</p>
              <p class="error text-danger" v-if="!$v.newData.date.rex">請輸入正確的日期格式</p>

              <div class="input-group mt-4">
                <div class="input-group-prepend"><span class="input-group-text">時間</span></div>
                <input
                  type="text"
                  class="form-control"
                  id="time"
                  placeholder="00:00 - 23:59"
                  v-model.trim="$v.newData.time.$model"
                />
              </div>
              <p class="error text-danger" v-if="!newData.time && $v.newData.$dirty">請輸入時間</p>
              <p class="error text-danger" v-if="!$v.newData.time.rex">請輸入正確的時間格式</p>

              <div class="input-group mt-4">
                <div class="input-group-prepend"><span class="input-group-text">收支</span></div>
                <select
                  class="custom-select"
                  id="sheet"
                  name="sheet"
                  v-model="$v.newData.sheet.$model"
                  @change="newData.type = ''"
                >
                  <option value="" disabled>請選擇</option>
                  <option value="income">收入</option>
                  <option value="pay">支出</option>
                </select>
              </div>
              <p class="error text-danger" v-if="!newData.sheet && $v.newData.$dirty">
                請選擇此筆帳目的收支
              </p>

              <div class="input-group mt-4">
                <div class="input-group-prepend"><span class="input-group-text">分類</span></div>
                <select
                  class="custom-select"
                  id="type"
                  name="type"
                  v-model="$v.newData.type.$model"
                >
                  <option value="" disabled>請選擇</option>
                  <option
                    v-for="(type, index) in filterType[newData.sheet]"
                    :key="index"
                    :value="type"
                    >{{ type }}</option
                  >
                </select>
              </div>
              <p class="error text-danger" v-if="!newData.type && $v.newData.$dirty">
                請選擇此筆帳目的分類
              </p>

              <div class="input-group mt-4">
                <div class="input-group-prepend"><span class="input-group-text">金額</span></div>
                <input
                  type="text"
                  class="form-control"
                  id="cost"
                  v-model.trim="$v.newData.cost.$model"
                  @blur="$v.newData.cost.$touch"
                />
                <div class="input-group-append"><span class="input-group-text">NT$</span></div>
              </div>
              <p class="error text-danger" v-if="!newData.cost && $v.newData.$dirty">請輸入金額</p>
              <p class="error text-danger" v-if="!$v.newData.cost.numeric">
                請避免輸入非數字之符號
              </p>
              <p class="error text-danger" v-if="!$v.newData.cost.rex">請勿輸入以0為開頭之數字</p>

              <div class="input-group mt-4">
                <div class="input-group-prepend"><span class="input-group-text">描述</span></div>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  v-model.trim="$v.newData.description.$model"
                />
              </div>
              <p class="error text-danger" v-if="!newData.description && $v.newData.$dirty">
                請簡單說明此筆帳目
              </p>
              <p class="error text-danger" v-if="!$v.newData.description.maxLength">
                已超過50個字元
              </p>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="toggleEditPopup(false)">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="editData">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { required, numeric, maxLength } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
export default {
  name: "EditPopup",
  props: {
    term: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      newData: {
        date: "",
        time: "",
        sheet: this.term.sheet,
        type: this.term.type,
        cost: this.term.cost,
        description: this.term.description
      }
    };
  },
  validations: {
    newData: {
      date: {
        required,
        rex: value => {
          if (value === "") return true;
          var rex = new RegExp(/^(19|20)\d\d\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/);
          return rex.test(value);
        }
      },
      time: {
        required,
        rex: value => {
          if (value === "") return true;
          var rex = new RegExp(/^[0-2][0-9]:[0-5][0-9]$/);
          return rex.test(value);
        }
      },
      sheet: { required },
      type: { required },
      cost: {
        required,
        numeric,
        rex: value => {
          if (value === "" || value === "0") return true;
          var rex = new RegExp(/^0/);
          return !rex.test(value);
        }
      },
      description: { maxLength: maxLength(50) }
    }
  },
  mounted() {
    let config = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    };
    this.newData.date = new Date(this.term.date).toLocaleString("zh", config).split(" ")[0];
    this.newData.time = new Date(this.term.time).toLocaleString("zh", config).split(" ")[1];
  },
  computed: {
    ...mapState(["typeList"]),
    filterType() {
      return {
        income: this.typeList.income,
        pay: this.typeList.pay
      };
    },
    dateTimestamp() {
      return new Date(this.newData.date).getTime();
    },
    Timestamp() {
      return new Date(`${this.newData.date} ${this.newData.time}`).getTime();
    }
  },
  methods: {
    ...mapActions(["EDIT_DATA"]),
    toggleEditPopup(state) {
      this.$emit("toggleEditPopup", state);
    },
    editData() {
      this.$v.newData.$touch();
      if (!this.$v.newData.$invalid) {
        let data = {
          old: this.term,
          new: {
            date: this.dateTimestamp,
            time: this.Timestamp,
            sheet: this.newData.sheet,
            type: this.newData.type,
            cost: Number(this.newData.cost),
            description: this.newData.description,
            updateTime: new Date().getTime()
          }
        };
        this.EDIT_DATA(data);
        this.toggleEditPopup(false);
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
