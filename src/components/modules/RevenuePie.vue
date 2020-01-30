<template>
    <Module :footer="true">
      <template slot="head">
        <h5 class="my-3">收入總計</h5>
      </template>
      <div slot="body" class="p-4">
        <highcharts :options="chartOptions" v-if="chartOptions.series[0].data.length"/>
        <h4 class="d-flex justify-content-center align-items-center mb-0" style="height: 250px" v-else>無任何收入</h4>
      </div>
      <template slot="footer">
        <p class="my-2 mb-0 text-right">總計: {{total | currency}}</p>
      </template>
    </Module>
</template>

<script>
import Module from '@/components/element/Module'
import { Chart } from 'highcharts-vue'
import { mapGetters } from 'vuex'
export default {
  name: 'RevenuePie',
  components: {
    Module,
    highcharts: Chart
  },
  computed: {
    ...mapGetters({
      seriesData: 'GET_REVENUE_PIE_DATA'
    }),
    total () {
      let total = 0
      this.seriesData.forEach((item) => {
        total += item[1]
      })
      return total
    },
    chartOptions () {
      return {
        chart: {
          height: '250px'
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: true,
          pointFormat: '{series.name}: <b>NT$' + '{point.y}</b>'
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: 10,
              connectorWidth: 1,
              connectorPadding: 0,
              format: '{point.name}: {point.percentage:.1f}%',
              style: {
                fontSize: '12px',
                fontWeight: 'normal'
              }
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: '金額',
          data: this.seriesData
        }],
        responsive: {
          rules: [{
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            },
            condition: {
              maxWidth: 300
            }
          }]
        },
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>
