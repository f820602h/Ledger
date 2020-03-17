import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import Vuelidate from 'vuelidate'

Vue.use(Vuex)
Vue.use(Vuelidate)

export default new Vuex.Store({
  state: {
    user: '',
    loginState: false,
    today: '',
    currentDate: '',
    dateRange: {},
    save: 0,
    ledger: [],
    typeList: {}
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_LOGIN_STATE (state, payload) {
      state.loginState = payload
    },
    SET_TODAY (state, payload) {
      state.today = payload
    },
    SET_LEDGER (state, payload) {
      state.ledger = payload
    },
    SET_SAVE (state, payload) {
      state.save = payload
    },
    SET_TYPE_LIST (state, payload) {
      state.typeList = payload
    },
    SET_CURRENT_DATE (state, payload) {
      state.currentDate = payload
    },
    SET_DATE_RANGE (state, payload) {
      state.dateRange = payload
    }
  },
  actions: {
    SIGNUP ({ commit, dispatch }, payload) {
      axios.post(`${process.env.VUE_APP_URL}/ledger/signup`, payload)
        .then(res => {
          if (res.data.success) {
            console.log('註冊成功')
          } else {
            console.log(res.data.msg)
          }
        })
    },

    LOGIN ({ commit, dispatch }, payload) {
      axios.post(`${process.env.VUE_APP_URL}/ledger/login`, payload)
        .then(res => {
          if (res.data.success) {
            dispatch('INIT_DATA')
            commit('SET_LOGIN_STATE', true)
          } else {
            console.log(res.data.msg)
            commit('SET_LOGIN_STATE', false)
          }
        })
    },

    LOGOUT ({ commit }, payload) {
      axios.get(`${process.env.VUE_APP_URL}/ledger/logout`, payload)
        .then(res => {
          if (res.data.success) {
            commit('SET_LOGIN_STATE', false)
            router.push('/')
          } else {
            console.log(res.data.msg)
          }
        })
    },

    INIT_DATA ({ commit, dispatch }) {
      dispatch('GET_TODAY_TIME_STAMP')
      axios.get(`${process.env.VUE_APP_URL}/ledger/`)
        .then(res => {
          commit('SET_USER', res.data.body.name)
          commit('SET_LEDGER', res.data.body.ledger)
          commit('SET_SAVE', res.data.body.save)
          commit('SET_TYPE_LIST', res.data.body.type)
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
      commit('SET_CURRENT_DATE', timestamp)
    },

    ADD_NEW_DATA ({ state, commit }, data) {
      let newSave = data.sheet === 'pay' ? state.save - data.cost : state.save + data.cost
      let newLedger = state.ledger.slice()
      newLedger.push(data)
      axios.post(`${process.env.VUE_APP_URL}/ledger`, { newLedger, newSave })
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
      axios.post(`${process.env.VUE_APP_URL}/ledger`, { newLedger, newSave })
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
      axios.post(`${process.env.VUE_APP_URL}/ledger`, { newLedger, newSave })
        .then(() => {
          commit('SET_LEDGER', newLedger)
          commit('SET_SAVE', newSave)
        })
    },

    RESET_SAVE ({ state, commit }, newSave) {
      axios.post(`${process.env.VUE_APP_URL}/ledger/save`, { newSave })
        .then(() => {
          commit('SET_SAVE', newSave)
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
    },

    GET_RANGE_DATA (state) {
      let data = state.ledger.filter((item) => {
        return item.time >= state.dateRange.start && item.time < state.dateRange.end
      })
      return data
    },

    GET_REVENUE_PIE_DATA (state, gettres) {
      let data = []
      let typePool = []
      let costPool = []
      let rangeData = gettres.GET_RANGE_DATA.filter((term) => {
        return term.sheet === 'income'
      })
      rangeData.forEach((term) => {
        let index = typePool.indexOf(term.type)
        if (index === -1) {
          typePool.push(term.type)
          costPool.push(term.cost)
        } else costPool[index] += term.cost
      })
      for (let i = 0; i < typePool.length; i++) {
        data.push({
          name: typePool[i],
          y: costPool[i]
        })
      }
      return data
    },

    GET_EXPENSES_PIE_DATA (state, gettres) {
      let data = []
      let typePool = []
      let costPool = []
      let rangeData = gettres.GET_RANGE_DATA.filter((term) => {
        return term.sheet === 'pay'
      })
      rangeData.forEach((term) => {
        let index = typePool.indexOf(term.type)
        if (index === -1) {
          typePool.push(term.type)
          costPool.push(term.cost)
        } else costPool[index] += term.cost
      })
      for (let i = 0; i < typePool.length; i++) {
        data.push({
          name: typePool[i],
          y: costPool[i]
        })
      }
      return data
    },

    GET_SPENDING_TREND_DATA (state, gettres) {
      let data = []
      let typePool = []
      let costPool = []
      let totalPool = []
      let arrayLength = (state.dateRange.end - state.dateRange.start) / 86400000
      let rangeData = gettres.GET_RANGE_DATA.filter((term) => {
        return term.sheet === 'pay'
      })
      rangeData.forEach((term) => {
        let index = typePool.indexOf(term.type)
        let dateSort = (term.date - state.dateRange.start) / 86400000
        if (!totalPool.length) {
          totalPool.length = arrayLength
          totalPool.fill(0)
        }
        if (index === -1) {
          typePool.push(term.type)
          index = typePool.indexOf(term.type)
          costPool[index] = []
          costPool[index].length = arrayLength
          costPool[index].fill(0)
        }
        costPool[index][dateSort] += term.cost
        totalPool[dateSort] += term.cost
      })
      for (let i = 0; i < typePool.length; i++) {
        data.push({
          name: typePool[i],
          data: costPool[i]
        })
      }
      data.push({
        type: 'column',
        name: '總消費',
        data: totalPool,
        zIndex: -1,
        color: 'rgba(200,200,200,.5)'
      })
      return data
    }
  }
})
