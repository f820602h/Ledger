<template>
  <div>
      <Account />
      <hr class="mt-4 mb-0">
      <Calendar />
      <SpendingList />
  </div>
</template>

<script>
import Account from '@/components/modules/Account'
import Calendar from '@/components/modules/Calendar'
import SpendingList from '@/components/modules/SpendingList'
export default {
  name: 'Daily',
  components: {
    Account,
    Calendar,
    SpendingList
  }
}
</script>

<style lang="scss" scoped>

</style>
