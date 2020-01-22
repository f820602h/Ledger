<template>
    <Module :footer="true">
      <template slot="head">
        <h5 class="my-3">支出總計</h5>
      </template>
      <div slot="body" class="p-4">
        <highcharts :options="chartOptions"/>
      </div>
      <template slot="footer">
        <p class="my-2 mb-0 text-right">總計:</p>
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
          enabled: !!this.seriesData,
          pointFormat: '{series.name}: <b>NT$' + '{point.y}</b>'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'middle',
          padding: 0,
          itemDistance: 10,
          itemMarginTop: 10
        },
        plotOptions: {
          pie: {
            dataLabels: {
              enabled: !!this.seriesData,
              distance: 3,
              connectorWidth: 1,
              connectorPadding: 0,
              format: '<b>{point.percentage:.1f}%</b>'
            },
            showInLegend: true
          }
        },
        series: [{
          type: 'pie',
          name: '金額',
          data: this.seriesData ? this.seriesData : [{
            name: '無',
            y: 100,
            color: '#ccc'
          }]
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
      seriesData: 'GET_EXPENSES_PIE_DATA'
    })
  }
}
</script>
