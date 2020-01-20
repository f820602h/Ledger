<template>
  <Module class="mt-4">
    <template slot="head">
      <h5 class="my-3">消費曲線</h5>
    </template>
    <div slot="body" class="p-4">
      <highcharts :options="chartOptions"/>
    </div>
  </Module>
</template>

<script>
import Module from '@/components/element/Module'
import { Chart } from 'highcharts-vue'
export default {
  name: 'SpendingTrend',
  components: {
    Module,
    highcharts: Chart
  },
  data () {
    return {
      chartOptions: {
        chart: {
          height: '350px'
        },
        title: undefined,
        yAxis: {
          title: {
            text: undefined
          }
        },
        legend: {
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top'
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2010
          }
        },
        series: [
          {
            name: '销售',
            data: [117, 177, 160, 197, 201, 243, 321, 393]
          },
          {
            name: '其他',
            data: [129, 59, 81, 112, 89, 118, 182, 181]
          }
        ],
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
