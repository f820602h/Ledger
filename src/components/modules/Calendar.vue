<template>
  <Module class="col-12 col-md-auto mt-4">
    <div slot="body" class="calendar px-3 py-4">
      <div class="row">
        <div class="col-6">
          <select name="year" id="year" class="form-control" v-model="datePick.year" @change="goToDate">
            <option v-for="i in 5" :key="i" :value="2019 + i">
              {{ 2019 + i + ' 年'}}
            </option>
          </select>
        </div>
        <div class="col-6">
          <select name="month" id="month" class="form-control " v-model="datePick.month" @change="goToDate">
            <option v-for="i in 12" :key="i" :value="i-1">
              {{ i + ' 月'}}
            </option>
          </select>
        </div>
      </div>
      <div class="week d-flex flex-wrap mt-2 mx-auto">
        <p
          class="mb-0 p-2 text-center font-weight-bold"
          v-for="text in week"
          :key="text"
        >
        {{ text }}
        </p>
      </div>
      <hr class="my-2">
      <div class="date d-flex align-items-stretch flex-wrap mx-auto" v-if="datePick.date">
        <p
          class="prevMonth d-flex justify-content-center align-items-center mb-0 text-center"
          v-for="date in prevMonth"
          :key="'p'+ date"
        >
          <template v-if="datePick.month === 0">
            {{ HowManyDay(datePick.year - 1, 11) - prevMonth + date }}
          </template>
          <template v-else>
            {{ HowManyDay(datePick.year, datePick.month -1) - prevMonth + date }}
          </template>
        </p>
        <p
          :class="{picked: new Date(currentDate).getDate() === date}"
          class="d-flex justify-content-center align-items-center mb-0 text-center rounded"
          v-for="date in HowManyDay(datePick.year, datePick.month)"
          :key="date"
          @click="pickDate(date)"
        >
          {{ date }}
        </p>
        <p
          class="nextMonth d-flex justify-content-center align-items-center mb-0 text-center"
          v-for="date in nextMonth"
          :key="'n'+ date"
        >
          {{ date }}
        </p>
      </div>
    </div>
  </Module>
</template>

<script>
import Module from '@/components/element/Module'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Calendar',
  components: {
    Module
  },
  data () {
    return {
      datePick: {
        year: '',
        month: '',
        date: ''
      },
      day: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      week: ['一', '二', '三', '四', '五', '六', '日']
    }
  },
  mounted () {
    this.datePick.year = new Date(this.currentDate).getFullYear()
    this.datePick.month = new Date(this.currentDate).getMonth()
    this.datePick.date = new Date(this.currentDate).getDate()
  },
  computed: {
    ...mapState(['currentDate']),
    ...mapGetters({ dailyData: 'GET_DAILY_DATA' }),
    prevMonth () {
      let day = new Date()
      day.setFullYear(this.datePick.year, this.datePick.month, 1)
      return (day.getDay() + 6) % 7
    },
    nextMonth () {
      let total = this.HowManyDay(this.datePick.year, this.datePick.month) + this.prevMonth > 35 ? 42 : 35
      return total - (this.HowManyDay(this.datePick.year, this.datePick.month) + this.prevMonth)
    },
    dateTimestamp () {
      return new Date(`${this.datePick.year}-${this.datePick.month + 1}-${this.datePick.date}`).getTime()
    }
  },
  methods: {
    goToDate () {
      this.$router.push({ name: 'Daily', params: { timestamp: this.dateTimestamp } })
    },
    pickDate (date) {
      this.datePick.date = date
      this.goToDate()
    },
    isLeapYear (year) {
      return year % 400 === 0 ? true : year % 4 === 0 && year % 100 !== 0
    },
    HowManyDay (year, month) {
      return this.isLeapYear(year) && month === 1 ? 29 : this.day[month]
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar{
  .week{
    width: 315px;
    p{
      width: 45px;
      height: 30px;
      line-height: 14px;
    }
  }
  .date{
    width: 315px;
    height: 203px;
    p{
      width: 45px;
      cursor: pointer;
      &.picked{
        background: #ccc;
      }
      &.prevMonth,&.nextMonth{
        opacity: 0.2;
        cursor: default;
      }
      &:nth-child(7n-1){
        color: red;
      }
      &:nth-child(7n){
        color: red;
      }
    }
  }
}
</style>
