<template>
  <Module class="col-12 col-md-auto mt-4">
    <div slot="body" class="calendar px-3 py-4">
      <div class="row">
        <div class="col-6">
          <select name="year" id="year" class="form-control" v-model="datePick.year">
            <option v-for="i in 5" :key="i" :value="2019 + i">
              {{ 2019 + i + ' 年'}}
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
          :class="{picked: pickedDate === date}"
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
      datePick: {},
      firstDay: 0,
      day: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      week: ['一', '二', '三', '四', '五', '六', '日']
    }
  },
  mounted () {
    let whatDay = new Date()
    this.datePick = {
      year: whatDay.getFullYear(),
      month: whatDay.getMonth(),
      date: whatDay.getDate()
    }
  },
  computed: {
    ...mapState(['today', 'currentDate']),
    ...mapGetters({ dailyData: 'GET_DAILY_DATA' }),
    dateTimestamp () {
      return new Date(`${this.datePick.year}-${this.datePick.month + 1}-${this.datePick.date}`).getTime()
    },
    pickedDate () {
      return new Date(this.currentDate).getDate()
    },
    isLeapYear () {
      return this.datePick.year % 400 === 0 ? true : this.datePick.year % 4 === 0 && this.datePick.year % 100 !== 0
    },
    HowManyDay () {
      return this.isLeapYear && this.datePick.month === 1 ? 29 : this.day[this.datePick.month]
    }
  },
  watch: {
    dateTimestamp () {
      let day = new Date()
      day.setFullYear(this.datePick.year, this.datePick.month, 1)
      this.firstDay = (day.getDay() + 6) % 7
      this.$store.commit('SET_CURRENT_DATE', this.dateTimestamp)
    }
  },
  methods: {
    pickDate (date) {
      this.datePick.date = date
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
      &.space{
        cursor: default;
      }
    }
  }
}
</style>
