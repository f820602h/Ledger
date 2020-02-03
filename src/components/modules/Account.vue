<template>
  <div class="row">
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <div slot="head" class="d-flex justify-content-between align-items-center">
        <h5 class="my-3">擁有存款</h5>
        <button class="btn btn-sm btn-outline-secondary my-2" @click="toggleResetPopup(true)">重設存款</button>
      </div>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">{{ save | currency }}</h4>
      </div>
    </Module>
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <template slot="head">
        <h5 class="my-3">今日收入</h5>
      </template>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">{{ income | currency }}</h4>
      </div>
    </Module>
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <template slot="head">
        <h5 class="my-3">今日支出</h5>
      </template>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">{{ pay | currency }}</h4>
      </div>
    </Module>
    <ResetPopup v-if="resetPopupIsShow" @toggleResetPopup="toggleResetPopup"/>
  </div>
</template>

<script>
import Module from '@/components/element/Module'
import ResetPopup from '@/components/utility/ResetPopup'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Account',
  components: {
    Module,
    ResetPopup
  },
  data () {
    return {
      resetPopupIsShow: false
    }
  },
  computed: {
    ...mapState(['save']),
    ...mapGetters({
      todayData: 'GET_TODAY_DATA'
    }),
    income () {
      let income = 0
      if (this.todayData.length) {
        this.todayData.forEach(item => {
          if (item.sheet === 'income') income = income + Number(item.cost)
        })
      }
      return income
    },
    pay () {
      let pay = 0
      if (this.todayData.length) {
        this.todayData.forEach(item => {
          if (item.sheet === 'pay') pay = pay + Number(item.cost)
        })
      }
      return pay
    }
  },
  methods: {
    toggleResetPopup (state) {
      this.resetPopupIsShow = state
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
