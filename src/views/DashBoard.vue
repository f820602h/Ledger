<template>
  <div>
    <DatePicker/>
    <div class="row mt-4">
      <RevenuePie class="col-12 col-md-6"/>
      <ExpensesPie class="col-12 col-md-6 mt-4 mt-md-0"/>
    </div>
    <SpendingTrend/>
  </div>
</template>

<script>
import DatePicker from '@/components/modules/DatePicker'
import SpendingTrend from '@/components/modules/SpendingTrend'
import RevenuePie from '@/components/modules/RevenuePie'
import ExpensesPie from '@/components/modules/ExpensesPie'
export default {
  name: 'DashBoard',
  components: {
    DatePicker,
    SpendingTrend,
    RevenuePie,
    ExpensesPie
  }
}
</script>
