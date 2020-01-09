<template>
  <div class="mt-4">
    <Module>
      <template slot="head">
        <h5 class="my-3">收支明細</h5>
      </template>
      <div slot="body" class="p-4">
        <div class="row align-items-center">
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="sheet">收支</label>
            </div>
            <select class="custom-select" id="sheet" name="sheet" v-model="filter.sheet">
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
        <div v-if="dailyData">
          <div
            class="listItem row align-items-center no-gutters"
            v-for="list in dailyData"
            :key="list.time"
          >
            <div class="col-6 col-md-3">
              <h4 class="mb-0 text-md-center">{{list.type}}</h4>
            </div>
            <div class="col-6 col-md-3 order-md-1">
              <h4 class="mb-0 text-right text-md-center">{{list.cost | currency}}</h4>
            </div>
            <div class="col-12 col-md-4">
              <p class="my-1">{{list.time | time}}</p>
              <p class="my-1">{{list.description}}</p>
            </div>
            <div class="col-12 col-md-2 text-right order-md-2">
              <button class="btn btn-sm btn-info my-1">編輯</button>
              <button class="btn btn-sm btn-danger ml-1 my-1">刪除</button>
            </div>
            <hr class="col-12 order-5">
          </div>
        </div>
      </div>
    </Module>
  </div>
</template>

<script>
import Module from '@/components/element/Module'
import { mapState } from 'vuex'
export default {
  name: 'SpendingList',
  components: {
    Module
  },
  data () {
    return {
      filter: {
        sheet: 'all',
        type: 'all',
        sort: 'timeAsc'
      }
    }
  },
  computed: {
    ...mapState(['dailyData', 'typeList']),
    filterType () {
      return {
        all: [1, 2, 3, 4, 5],
        income: this.typeList.income,
        pay: this.typeList.pay
      }
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
