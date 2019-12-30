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
            <select class="custom-select" id="sheet" name="sheet">
              <option value="all" selected>全部</option>
              <option value="income">收入</option>
              <option value="pay">支出</option>
            </select>
          </div>
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="type">分類</label>
            </div>
            <select class="custom-select" id="type" name="type">
              <option value="all" selected>全部</option>
            </select>
          </div>
          <div class="col-12 col-md-4 input-group my-2">
            <div class="input-group-prepend">
              <label class="input-group-text" for="type">排序</label>
            </div>
            <select class="custom-select" id="type" name="type">
              <option value="all" selected>時間由早到晚</option>
              <option value="all">時間由晚到早</option>
              <option value="all">金額由低至高</option>
              <option value="all">金額由高至低</option>
            </select>
          </div>
        </div>
        <hr>
        <div>
          <div class="listItem row align-items-center no-gutters">
            <div class="col-6 col-md-3">
              <h4 class="mb-0 text-md-center">伙食費</h4>
            </div>
            <div class="col-6 col-md-3 order-md-1">
              <h4 class="mb-0 text-right text-md-center">$ 120</h4>
            </div>
            <div class="col-12 col-md-4">
              <p class="my-1">上午 06:00 </p>
              <p class="my-1">早餐-火腿蛋餅</p>
            </div>
            <div class="col-12 col-md-2 text-right order-md-2">
              <button class="btn btn-sm btn-info my-1">編輯</button>
              <button class="btn btn-sm btn-danger ml-1 my-1">刪除</button>
            </div>
            <hr class="col-12 order-5">
          </div>
          <div class="listItem row align-items-center no-gutters">
            <div class="col-6 col-md-3">
              <h4 class="mb-0 text-md-center">伙食費</h4>
            </div>
            <div class="col-6 col-md-3 order-md-1">
              <h4 class="mb-0 text-right text-md-center">$ 120</h4>
            </div>
            <div class="col-12 col-md-4">
              <p class="my-1">上午 06:00 </p>
              <p class="my-1">早餐-火腿蛋餅</p>
            </div>
            <div class="col-12 col-md-2 text-right order-md-2">
              <button class="btn btn-sm btn-info my-1">編輯</button>
              <button class="btn btn-sm btn-danger ml-1 my-1">刪除</button>
            </div>
            <hr class="col-12 order-5">
          </div>
          <div class="listItem row align-items-center no-gutters">
            <div class="col-6 col-md-3">
              <h4 class="mb-0 text-md-center">伙食費</h4>
            </div>
            <div class="col-6 col-md-3 order-md-1">
              <h4 class="mb-0 text-right text-md-center">$ 120</h4>
            </div>
            <div class="col-12 col-md-4">
              <p class="my-1">上午 06:00 </p>
              <p class="my-1">早餐-火腿蛋餅</p>
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
export default {
  name: 'Calendar',
  components: {
    Module
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
