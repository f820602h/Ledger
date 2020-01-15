import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuex)
Vue.use(Vuelidate)

export default new Vuex.Store({
  state: {
    account: {},
    save: 0,
    typeList: {},
    todayData: [],
    dailyData: []
  },
  mutations: {
    SET_ACCOUNT_DATA (state, payload) {
      state.account = payload
    },
    SET_SAVE (state, payload) {
      state.save = payload
    },
    SET_TYPE_LIST (state, payload) {
      state.typeList = payload
    },
    SET_TODAY_DATA (state, payload) {
      state.todayData = payload
    },
    SET_DAILY_DATA (state, payload) {
      state.dailyData = payload
    }
  },
  actions: {
    GET_ACCOUNT_DATA ({ commit }) {
      axios.get(`${process.env.VUE_APP_URL}/ledger/account`)
        .then(res => {
          if (res.data.success) {
            commit('SET_ACCOUNT_DATA', res.data.body)
          }
        })
    },
    GET_SAVE ({ commit }) {
      axios.get(`${process.env.VUE_APP_URL}/ledger/save`)
        .then(res => {
          if (res.data.success) {
            commit('SET_SAVE', res.data.body)
          }
        })
    },
    GET_TYPE_LIST ({ commit }) {
      axios.get(`${process.env.VUE_APP_URL}/ledger/type`)
        .then(res => {
          if (res.data.success) {
            commit('SET_TYPE_LIST', res.data.body)
          }
        })
    },
    GET_TODAY_DATA ({ commit }) {
      let whatDay = new Date()
      const today = {
        year: whatDay.getFullYear(),
        month: whatDay.getMonth(),
        date: whatDay.getDate()
      }
      const timestamp = new Date(`${today.year}-${today.month + 1}-${today.date}`).getTime()
      axios.get(`${process.env.VUE_APP_URL}/ledger/${timestamp}`)
        .then(res => {
          if (res.data.body) {
            commit('SET_TODAY_DATA', res.data.body)
          }
        })
    },
    GET_DAILY_DATA ({ commit }, data) {
      const timestamp = new Date(`${data.year}-${data.month + 1}-${data.date}`).getTime()
      axios.get(`${process.env.VUE_APP_URL}/ledger/${timestamp}`)
        .then(res => {
          if (res.data.body) {
            commit('SET_DAILY_DATA', res.data.body)
          }
        })
    }
  },
  getters: {}
})
