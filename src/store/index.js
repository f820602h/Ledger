import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuex)
Vue.use(Vuelidate)

export default new Vuex.Store({
  state: {
    user: 'f820602h@yahoo.com.tw',
    todayTimestamp: '',
    currentDate: '',
    save: 0,
    ledger: [],
    account: {},
    typeList: {},
    todayData: []
  },
  mutations: {
    SET_TODAY_TIME_STAMP (state, payload) {
      state.todayTimestamp = payload
    },
    SET_LEDGER (state, payload) {
      state.ledger = payload
    },
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
    SET_CURRENT_DATA (state, payload) {
      state.currentDate = payload
    }
  },
  actions: {
    INIT_DATA ({ state, commit, dispatch }) {
      dispatch('GET_TODAY_TIME_STAMP')
      axios.get(`${process.env.VUE_APP_URL}/ledger/${state.user}`)
        .then(res => {
          if (res.data.success) {
            commit('SET_LEDGER', res.data.body.ledger)
            commit('SET_ACCOUNT_DATA', res.data.body.account)
            commit('SET_SAVE', res.data.body.save)
            commit('SET_TYPE_LIST', res.data.body.type)
            dispatch('GET_TODAY_DATA')
          }
        })
    },

    GET_TODAY_TIME_STAMP ({ commit }) {
      let whatDay = new Date()
      const today = {
        year: whatDay.getFullYear(),
        month: whatDay.getMonth(),
        date: whatDay.getDate()
      }
      const timestamp = new Date(`${today.year}-${today.month + 1}-${today.date}`).getTime()
      commit('SET_TODAY_TIME_STAMP', timestamp)
      commit('SET_CURRENT_DATA', timestamp)
    },

    GET_TODAY_DATA ({ state, commit }) {
      let data = state.ledger.filter((item) => {
        return item.date === state.todayTimestamp
      })
      if (data) commit('SET_TODAY_DATA', data)
    },

    GET_CURRENT_DATA ({ commit }, date) {
      const timestamp = new Date(`${date.year}-${date.month + 1}-${date.date}`).getTime()
      commit('SET_CURRENT_DATA', timestamp)
    },

    ADD_NEW_DATA ({ state }, data) {
      state.ledger.push(data)
      axios.post(`${process.env.VUE_APP_URL}/ledger/${state.user}`, state.ledger)
    }
  },
  getters: {
    GET_DAILY_DATA (state) {
      let data = state.ledger.filter((item) => {
        return item.date === state.currentDate
      })
      return data
    }
  }
})
