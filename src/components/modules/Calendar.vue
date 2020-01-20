<template>
  <div class="row">
    <Module class="col-12 col-md-auto mt-4">
      <div slot="body" class="calendar px-3 py-4">
        <div class="row">
          <div class="col-6">
            <select name="year" id="year" class="form-control" v-model="datePick.year">
              <option v-for="i in today.year + 2 - 2014" :key="i" :value="2014 + i">
                {{ 2014 + i + ' 年'}}
              </option>
            </select>
          </div>
          <div class="col-6">
            <select name="month" id="month" class="form-control " v-model="datePick.month">
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
        <div class="date d-flex align-items-stretch flex-wrap mx-auto">
          <p
            class="space mb-0 text-center"
            v-for="space in firstDay"
            :key="'s'+ space"
          />
          <p
            :class="{today: datePick.date === date}"
            class="d-flex justify-content-center align-items-center mb-0 text-center rounded"
            v-for="date in HowManyDay"
            :key="date"
            @click="pickDate(date)"
          >
            {{ date }}
          </p>
        </div>
      </div>
    </Module>
    <Module class="col mt-4">
      <div slot="head" class="d-flex justify-content-between align-items-center">
        <h5 class="my-3">每日總計</h5>
        <button class="btn btn-info btn-sm" @click="backToday" :disabled="isToday">
          回到今天
        </button>
      </div>
      <div slot="body" class="dateDisplay p-4">
        <h4 class="mb-0 font-weight-light">
          {{datePick.year}} 年 {{datePick.month+1}} 月 {{datePick.date}} 日
          <span v-if="isToday">(今天)</span>
        </h4>
        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="my-3 font-weight-normal">當天收入</h5>
          <h4 class="mb-0 font-weight-normal text-center">{{ income | currency }}</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="my-3 font-weight-normal">當天支出</h5>
          <h4 class="mb-0 font-weight-normal text-center">{{ pay | currency }}</h4>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="my-3 font-weight-normal">當天總收支</h5>
          <h4
            class="mb-0 font-weight-normal text-center"
            :class="{'text-danger': income < pay, 'text-success': income > pay}"
          >
            <span v-if="income < pay">-</span>{{ surplus | currency }}
          </h4>
        </div>
      </div>
    </Module>
  </div>
</template>

<script>
import Module from '@/components/element/Module'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Calendar',
  components: {
    Module
  },
  data () {
    return {
      datePick: {},
      today: {},
      firstDay: 0,
      day: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      week: ['一', '二', '三', '四', '五', '六', '日']
    }
  },
  mounted () {
    let whatDay = new Date()
    this.today = {
      year: whatDay.getFullYear(),
      month: whatDay.getMonth(),
      date: whatDay.getDate()
    }
    this.datePick = {
      year: whatDay.getFullYear(),
      month: whatDay.getMonth(),
      date: whatDay.getDate()
    }
  },
  computed: {
    ...mapGetters({
      dailyData: 'GET_DAILY_DATA'
    }),
    isToday () {
      if (this.datePick.year === this.today.year && this.datePick.month === this.today.month) {
        if (this.datePick.date === this.today.date) return true
        else return false
      } else {
        return false
      }
    },
    isLeapYear () {
      if (this.datePick.year % 400 === 0) {
        return true
      } else if (this.datePick.year % 4 === 0 && this.datePick.year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    HowManyDay () {
      if (this.isLeapYear && this.datePick.month === 1) {
        return 29
      } else {
        return this.day[this.datePick.month]
      }
    },
    income () {
      let income = 0
      if (this.dailyData.length) {
        this.dailyData.forEach(item => {
          if (item.sheet === 'income') income = income + Number(item.cost)
        })
      }
      return income
    },
    pay () {
      let pay = 0
      if (this.dailyData.length) {
        this.dailyData.forEach(item => {
          if (item.sheet === 'pay') pay = pay + Number(item.cost)
        })
      }
      return pay
    },
    surplus () {
      return Math.abs(this.income - this.pay)
    }
  },
  watch: {
    'datePick.year' () {
      let day = new Date()
      day.setFullYear(this.datePick.year, this.datePick.month, 1)
      this.firstDay = day.getDay() === 0 ? 6 : day.getDay()
      this.GET_CURRENT_DATA(this.datePick)
    },
    'datePick.month' () {
      let day = new Date()
      day.setFullYear(this.datePick.year, this.datePick.month, 1)
      this.firstDay = day.getDay() === 0 ? 6 : day.getDay()
      this.GET_CURRENT_DATA(this.datePick)
    },
    'datePick.date' () {
      this.GET_CURRENT_DATA(this.datePick)
    }
  },
  methods: {
    ...mapActions(['GET_CURRENT_DATA']),
    pickDate (date) {
      this.datePick.date = date
    },
    backToday () {
      this.datePick.year = this.today.year
      this.datePick.month = this.today.month
      this.datePick.date = this.today.date
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
      &.today{
        background: #ccc;
      }
      &.space{
        cursor: default;
      }
    }
  }
}
.dateDisplay{
  height: 287px;
  h4{
    @media screen and (max-width: 991px){
      font-size: 1.2rem;
    }
  }
}
</style>
