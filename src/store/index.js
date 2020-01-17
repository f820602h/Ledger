import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuex)
Vue.use(Vuelidate)

export default new Vuex.Store({
  state: {
    user: 'f820602h@yahoo.com.tw',
    today: '',
    currentDate: '',
    save: 0,
    ledger: [],
    account: {},
    typeList: {}
  },
  mutations: {
    SET_TODAY (state, payload) {
      state.today = payload
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
      commit('SET_TODAY', timestamp)
      commit('SET_CURRENT_DATA', timestamp)
    },

    GET_CURRENT_DATA ({ commit }, date) {
      const timestamp = new Date(`${date.year}-${date.month + 1}-${date.date}`).getTime()
      commit('SET_CURRENT_DATA', timestamp)
    },

    ADD_NEW_DATA ({ state, commit }, data) {
      let newSave = data.sheet === 'pay' ? state.save - data.cost : state.save + data.cost
      let newLedger = state.ledger.slice()
      newLedger.push(data)
      axios.post(`${process.env.VUE_APP_URL}/ledger/${state.user}`, { newLedger, newSave })
        .then(() => {
          commit('SET_LEDGER', newLedger)
          commit('SET_SAVE', newSave)
        })
    },

    EDIT_DATA ({ state, commit }, data) {
      let newSave = data.old.sheet === 'pay' ? state.save + data.old.cost : state.save - data.old.cost
      newSave = data.new.sheet === 'pay' ? newSave - data.new.cost : newSave + data.new.cost
      let newLedger = state.ledger.slice().filter((item) => {
        return item.updateTime !== data.old.updateTime
      })
      newLedger.push(data.new)
      axios.post(`${process.env.VUE_APP_URL}/ledger/${state.user}`, { newLedger, newSave })
        .then(() => {
          commit('SET_LEDGER', newLedger)
          commit('SET_SAVE', newSave)
        })
    },

    DELE_DATA ({ state, commit }, data) {
      let newSave = data.sheet === 'pay' ? state.save + data.cost : state.save - data.cost
      let newLedger = state.ledger.slice().filter((item) => {
        return item.updateTime !== data.updateTime
      })
      axios.post(`${process.env.VUE_APP_URL}/ledger/${state.user}`, { newLedger, newSave })
        .then(() => {
          commit('SET_LEDGER', newLedger)
          commit('SET_SAVE', newSave)
          console.log('delete')
        })
    }
  },
  getters: {
    GET_TODAY_DATA (state) {
      let data = state.ledger.filter((item) => {
        return item.date === state.today
      })
      return data
    },
    GET_DAILY_DATA (state) {
      let data = state.ledger.filter((item) => {
        return item.date === state.currentDate
      })
      return data
    }
  }
})
