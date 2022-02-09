import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import Highcahrts from "highcharts";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "bootstrap";
import "@/assets/main.scss";

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(ElementUI);

Highcahrts.setOptions({
  lang: {
    thousandsSep: ",",
    shortMonths: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    weekdays: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
  },
  colors: [
    "rgb(236, 208, 120)",
    "rgba(217, 91, 67, 0.7)",
    "rgba(192, 41, 66, 0.7)",
    "rgba(84, 36, 55, 0.7)",
    "rgba(83, 119, 122, 0.7)",
    "rgba(119, 146, 174, 0.7)",
    "#636368"
  ]
});

Vue.filter("currency", function(value) {
  return "$ " + String(value).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
});
Vue.filter("dateRange", function(value) {
  let config = { year: "numeric", month: "2-digit", day: "2-digit" };
  let start =
    new Date(value.start)
      .toLocaleString("zh", config)
      .replace("/", " 年 ")
      .replace("/", " 月 ") + " 日";
  let end =
    new Date(value.end - 1)
      .toLocaleString("zh", config)
      .replace("/", " 年 ")
      .replace("/", " 月 ") + " 日";
  return `${start} - ${end}`;
});
Vue.filter("date", function(value) {
  let config = { year: "numeric", month: "2-digit", day: "2-digit" };
  let date =
    new Date(value)
      .toLocaleString("zh", config)
      .replace("/", " 年 ")
      .replace("/", " 月 ") + " 日";
  return date;
});
Vue.filter("time", function(value) {
  let config = { hour12: true, hour: "2-digit", minute: "2-digit" };
  return new Date(value).toLocaleString("zh", config).replace(/\D{2}/, "$& ");
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
