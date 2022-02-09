<template>
  <Module class="mt-4">
    <template slot="head">
      <h5 class="my-3">消費曲線</h5>
    </template>
    <div slot="body" class="p-4">
      <highcharts :options="chartOptions" v-if="this.seriesData.length" />
      <h4
        class="d-flex justify-content-center align-items-center mb-0"
        style="height: 150px"
        v-else
      >
        無任何消費
      </h4>
    </div>
  </Module>
</template>

<script>
import Module from "@/components/element/Module";
import { Chart } from "highcharts-vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "SpendingTrend",
  components: {
    Module,
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: "350px"
        },
        title: {
          text: null
        },
        xAxis: {
          type: "datetime",
          labels: {
            formatter() {
              return new Date(this.value).toLocaleString("zh-tw", {
                month: "numeric",
                day: "numeric"
              });
            }
          }
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            format: "$ {value}"
          }
        },
        legend: {
          layout: "horizontal",
          align: "right",
          verticalAlign: "top"
        },
        tooltip: {
          shared: true,
          formatter() {
            let head = new Date(this.x).toLocaleString("zh-tw", {
              year: "numeric",
              month: "numeric",
              day: "numeric"
            });
            let string = `<b>${head}</b><br/>`;
            this.points.forEach(points => {
              string += `<span style="color:${points.color}">\u25CF</span><b> ${points.series.name}：</b> NT$ ${points.y}<br />`;
            });
            return string;
          },
          style: {
            fontFamily: "Microsoft JhengHei",
            lineHeight: "20px"
          }
        },
        plotOptions: {
          column: {
            maxPointWidth: 30,
            dataLabels: {
              enabled: true,
              formatter() {
                if (this.y === 0) return;
                return `$${this.y}`;
              },
              style: {
                fontFamily: "Microsoft JhengHei",
                fontWeight: "normal",
                textOutline: 0,
                color: "rgb(150,150,150)"
              }
            }
          },
          series: {
            label: {
              connectorAllowed: false
            },
            cursor: "pointer",
            point: {
              events: {
                click: ({ point }) => {
                  this.$router.push({ name: "Daily", params: { timestamp: point.x - 28800000 } });
                }
              }
            },
            pointStart: Date.UTC(new Date()),
            pointInterval: 24 * 3600 * 1000 // one day
          }
        },
        series: [],
        credits: {
          enabled: false
        }
      }
    };
  },
  computed: {
    ...mapState(["dateRange"]),
    ...mapGetters({
      seriesData: "GET_SPENDING_TREND_DATA"
    })
  },
  watch: {
    dateRange(newValue) {
      this.chartOptions.plotOptions.series.pointStart = Date.UTC(new Date());
      setTimeout(() => {
        this.chartOptions.plotOptions.series.pointStart = Date.UTC(
          new Date(newValue.start).getFullYear(),
          new Date(newValue.start).getMonth(),
          new Date(newValue.start).getDate()
        );
      }, 0);
    },
    seriesData(newValue) {
      this.chartOptions.series = [];
      setTimeout(() => {
        this.chartOptions.series = newValue;
      }, 0);
    }
  }
};
</script>
