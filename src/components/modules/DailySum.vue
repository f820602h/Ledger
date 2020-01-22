<template>
  <Module class="col mt-4">
      <div slot="head" class="d-flex justify-content-between align-items-center">
        <h5 class="my-3">每日總計</h5>
        <button class="btn btn-info btn-sm" @click="backToday" :disabled="isToday">
          回到今天
        </button>
      </div>
      <div slot="body" class="dateDisplay p-4">
        <h4 class="mb-0 font-weight-light">
          {{ currentDate | date }}
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
</template>

<script>
import Module from '@/components/element/Module'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'DailySum',
  components: {
    Module
  },
  computed: {
    ...mapState(['today', 'currentDate']),
    ...mapGetters({
      dailyData: 'GET_DAILY_DATA'
    }),
    isToday () {
      return this.today === this.currentDate
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
  methods: {
    backToday () {
      this.$store.commit('SET_CURRENT_DATE', this.today)
    }
  }
}
</script>

<style lang="scss" scoped>
.dateDisplay{
  height: 287px;
  h4{
    @media screen and (max-width: 991px){
      font-size: 1.2rem;
    }
  }
}
</style>
