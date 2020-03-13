<template>
    <Module :footer="true">
      <template slot="head">
        <h5 class="my-3">收入總計</h5>
      </template>
      <div slot="body" class="p-4">
        <highcharts :options="chartOptions" v-if="seriesData.length"/>
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
  data () {
    return {
      chartOptions: {
        chart: {
          height: '250px'
        },
        title: {
          text: null
        },
        tooltip: {
          enabled: true,
          formatter () {
            return `<span style="color:${this.color}">\u25CF</span><b> ${this.key}</b><br /> 
            <b>占比：</b> ${Math.floor(this.percentage)}%<br /><b>金額：</b> NT$ ${this.y}`
          },
          style: {
            fontFamily: 'Microsoft JhengHei',
            lineHeight: '20px'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          padding: 0,
          itemDistance: 10,
          itemMarginTop: 10
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: true,
              distance: 3,
              connectorWidth: 1,
              connectorPadding: 0,
              format: '<b>{point.percentage:.1f}%</b>',
              style: {
                fontFamily: 'Microsoft JhengHei',
                fontWeight: 'normal',
                textOutline: 0,
                color: 'rgb(100,100,100)'
              }
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: '金額',
          data: []
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
  },
  computed: {
    ...mapGetters({
      seriesData: 'GET_REVENUE_PIE_DATA'
    }),
    total () {
      let total = 0
      this.seriesData.forEach((item) => {
        total += item.y
      })
      return total
    }
  },
  watch: {
    seriesData (newValue) {
      this.chartOptions.series[0].data = []
      setTimeout(() => {
        this.chartOptions.series[0].data = newValue
      }, 0)
    }
  }
}
</script>
