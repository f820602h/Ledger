<template>
  <div>
    <Module>
      <div slot="head" class="d-flex justify-content-between align-items-center">
        <h5 class="my-3">日期設定</h5>
        <router-link :to="'/daily'" class="btn btn-sm btn-info my-2">每日總覽</router-link>
      </div>
      <div slot="body" class="p-4">
        <div class="row align-items-center justify-content-between">
          <div class="btn-group btn-group-toggle col-auto">
            <label class="btn btn-info border" for="week" :class="{'btn-light': dataMode !== 'week'}">
              <input type="radio" name="dataMode" id="week" value="week" v-model="dataMode"> 本週
            </label>
            <label class="btn btn-info border" for="month" :class="{'btn-light': dataMode !== 'month'}">
              <input type="radio" name="dataMode" id="month" value="month" v-model="dataMode"> 本月
            </label>
            <label class="btn btn-info border" for="cust" :class="{'btn-light': dataMode !== 'cust'}">
              <input type="radio" name="dataMode" id="cust" value="cust" v-model="dataMode"> 自訂日期
            </label>
          </div>
          <p class="col-auto mt-3 mb-0 mt-md-0 font-weight-normal" v-if="dataMode !== 'cust'">
            {{ dateRange | dateRange }}
          </p>
        </div>
        <div class="row" v-if="dataMode === 'cust'">
          <div class="input-group col-12 col-md-6 mt-3">
            <input
              type="date"
              class="form-control"
              v-model="dateStart"
              min="2015-01-01"
              :max="dateEnd ? dateEnd : maxDate"
              @change="getCustDate"
            >
            <div class="input-group-append">
              <span class="input-group-text">起</span>
            </div>
          </div>
          <div class="input-group col-12 col-md-6 mt-3">
            <input
              type="date"
              class="form-control"
              v-model="dateEnd"
              :min="dateStart"
              :max="maxDate"
              :disabled="dateStart === ''"
              @change="getCustDate"
            >
            <div class="input-group-append">
              <span class="input-group-text">迄</span>
            </div>
          </div>
        </div>
      </div>
    </Module>
  </div>
</template>

<script>
import Module from '@/components/element/Module'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'DatePicker',
  components: {
    Module
  },
  data () {
    return {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      dataMode: '',
      dateStart: '',
      dateEnd: '',
      dateRange: {}
    }
  },
  mounted () {
    this.dataMode = 'week'
  },
  computed: {
    ...mapState(['today']),
    maxDate () {
      let maxYear = new Date(this.today).getFullYear() + 2
      return `${maxYear}-12-31`
    }
  },
  watch: {
    today () {
      this.getThisWeek()
      this.SET_DATE_RANGE(this.dateRange)
    },
    dataMode () {
      if (this.dataMode === 'week') this.getThisWeek()
      if (this.dataMode === 'month') this.getThisMonth()
      if (this.dataMode === 'cust') this.getCustDate()
    }
  },
  methods: {
    ...mapMutations(['SET_DATE_RANGE']),
    getThisWeek () {
      let whickDay = new Date(this.today).getDay()
      this.dateRange = {
        start: this.today - (whickDay - 1) * 86400000,
        end: this.today + (7 - whickDay + 1) * 86400000
      }
      this.SET_DATE_RANGE(this.dateRange)
    },
    getThisMonth () {
      let whickDate = new Date(this.today).getDate()
      let whickMonth = new Date(this.today).getMonth()
      let whickYear = new Date(this.today).getFullYear()
      let HowMuchDays = this.isLeapYear(whickYear) && whickMonth === 1 ? 29 : this.days[whickMonth]
      this.dateRange = {
        start: this.today - (whickDate - 1) * 86400000,
        end: this.today + (HowMuchDays - whickDate + 1) * 86400000
      }
      this.SET_DATE_RANGE(this.dateRange)
    },
    getCustDate () {
      this.dateRange = {
        start: new Date(this.dateStart + ' 00:00').getTime(),
        end: new Date(this.dateEnd + ' 00:00').getTime() + 86400000
      }
      this.SET_DATE_RANGE(this.dateRange)
    },
    isLeapYear (year) {
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
