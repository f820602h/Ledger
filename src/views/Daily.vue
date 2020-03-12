<template>
  <div>
      <Account />
      <hr class="mt-4 mb-0">
      <div class="row">
        <Calendar />
        <DailySum />
      </div>
      <SpendingList />
  </div>
</template>

<script>
import Account from '@/components/modules/Account'
import Calendar from '@/components/modules/Calendar'
import DailySum from '@/components/modules/DailySum'
import SpendingList from '@/components/modules/SpendingList'
export default {
  name: 'Daily',
  components: {
    Account,
    Calendar,
    DailySum,
    SpendingList
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('SET_CURRENT_DATE', Number(to.params.timestamp))
    next()
  },
  mounted () {
    this.$store.commit('SET_CURRENT_DATE', Number(this.$route.params.timestamp))
  }
}
</script>

<style lang="scss" scoped>

</style>
