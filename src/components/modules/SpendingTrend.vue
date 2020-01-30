<template>
  <Module class="mt-4">
    <template slot="head">
      <h5 class="my-3">消費曲線</h5>
    </template>
    <div slot="body" class="p-4">
      <highcharts :options="chartOptions" v-if="this.seriesData.length"/>
      <h4 class="d-flex justify-content-center align-items-center mb-0" style="height: 350px" v-else>
        無任何消費
      </h4>
    </div>
  </Module>
</template>

<script>
import Module from '@/components/element/Module'
import { Chart } from 'highcharts-vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SpendingTrend',
  components: {
    Module,
    highcharts: Chart
  },
  computed: {
    ...mapState(['dateRange']),
    ...mapGetters({
      seriesData: 'GET_SPENDING_TREND_DATA'
    }),
    chartOptions () {
      return {
        chart: {
          height: '350px'
        },
        title: undefined,
        xAxis: {
          type: 'datetime'
        },
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
            pointStart: Date.UTC(
              new Date(this.dateRange.start).getFullYear(),
              new Date(this.dateRange.start).getMonth(),
              new Date(this.dateRange.start).getDate()
            ),
            pointInterval: 24 * 3600 * 1000 // one day
          }
        },
        series: this.seriesData,
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>
