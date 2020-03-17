<template>
  <div class="mt-4">
    <Module>
      <div slot="head" class="d-flex justify-content-between align-items-center">
        <h5 class="my-3">收支明細</h5>
        <router-link :to="'/dashboard'" class="btn btn-sm btn-info my-2">詳細數據</router-link>
      </div>
      <div slot="body" class="p-4">
        <div class="row align-items-center">
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="sheet">收支</label>
            </div>
            <select class="custom-select" id="sheet" name="sheet" v-model="filter.sheet" @change="filter.type = 'all'">
              <option value="all">全部</option>
              <option value="income">收入</option>
              <option value="pay">支出</option>
            </select>
          </div>
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="type">分類</label>
            </div>
            <select class="custom-select" id="type" name="type" v-model="filter.type">
              <option value="all">全部</option>
              <option v-for="(type, index) in filterType[filter.sheet]" :key="index" :value="type">{{type}}</option>
            </select>
          </div>
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="sort">排序</label>
            </div>
            <select class="custom-select" id="sort" name="sort" v-model="filter.sort">
              <option value="timeAsc">時間由早到晚</option>
              <option value="timeDesc">時間由晚到早</option>
              <option value="costAsc">金額由低至高</option>
              <option value="costDesc">金額由高至低</option>
            </select>
          </div>
        </div>
        <hr>
        <div v-if="!filterSortDailyData.length">
          <h4 class="text-center mt-4 mb-0">目前沒有任何帳目喔！</h4>
        </div>
        <div v-if="filterSortDailyData.length">
          <div
            class="listItem row align-items-center no-gutters"
            v-for="term in filterSortDailyData"
            :key="term.updateTime"
          >
            <div class="col-6 col-md-3">
              <h4 class="mb-0 text-md-center">{{term.type}}</h4>
            </div>
            <div class="col-6 col-md-3 order-md-1">
              <h4 class="mb-0 text-right text-md-center">{{term.cost | currency}}</h4>
            </div>
            <div class="col-12 col-md-4">
              <p class="my-1">{{term.time | time}}</p>
              <p class="my-1">{{term.description}}</p>
            </div>
            <div class="col-12 col-md-2 text-right order-md-2">
              <button class="btn btn-sm btn-info my-1" @click="editData(term)">編輯</button>
              <button class="btn btn-sm btn-danger ml-1 my-1" @click="deleData(term)">刪除</button>
            </div>
            <hr class="col-12 order-5">
          </div>
        </div>
      </div>
    </Module>
    <EditPopup v-if="editPopupIsShow" @toggleEditPopup="toggleEditPopup" :term="editTerm"/>
    <DelePopup v-if="delePopupIsShow" @toggleDelePopup="toggleDelePopup" :term="deleTerm"/>
  </div>
</template>

<script>
import EditPopup from '@/components/utility/EditPopup'
import DelePopup from '@/components/utility/DelePopup'
import Module from '@/components/element/Module'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'SpendingList',
  components: {
    Module,
    EditPopup,
    DelePopup
  },
  data () {
    return {
      filter: {
        sheet: 'all',
        type: 'all',
        sort: 'timeAsc'
      },
      editTerm: {},
      deleTerm: {},
      editPopupIsShow: false,
      delePopupIsShow: false
    }
  },
  computed: {
    ...mapState(['typeList']),
    ...mapGetters({
      dailyData: 'GET_DAILY_DATA'
    }),
    filterType () {
      return {
        all: [],
        income: this.typeList.income,
        pay: this.typeList.pay
      }
    },
    filterSheetDailyData () {
      if (this.filter.sheet === 'all') return this.dailyData
      else {
        return this.dailyData.filter((item) => {
          return item.sheet === this.filter.sheet
        })
      }
    },
    filterTypeDailyData () {
      if (this.filter.type === 'all') return this.filterSheetDailyData
      else {
        return this.filterSheetDailyData.filter((item) => {
          return item.type === this.filter.type
        })
      }
    },
    filterSortDailyData () {
      let finalData = this.filterTypeDailyData.slice()
      finalData.sort((a, b) => {
        if (this.filter.sort === 'timeAsc') return a.time - b.time
        if (this.filter.sort === 'timeDesc') return b.time - a.time
        if (this.filter.sort === 'costAsc') return a.cost - b.cost
        if (this.filter.sort === 'costDesc') return b.cost - a.cost
      })
      return finalData
    }
  },
  methods: {
    editData (term) {
      this.editTerm = term
      this.toggleEditPopup(true)
    },
    toggleEditPopup (state) {
      this.editPopupIsShow = state
    },
    deleData (term) {
      this.deleTerm = term
      this.toggleDelePopup(true)
    },
    toggleDelePopup (state) {
      this.delePopupIsShow = state
    }
  }
}
</script>

<style lang="scss" scoped>
  .listItem:last-child{
    hr{
      display: none
    }
  }
</style>
