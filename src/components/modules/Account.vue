<template>
  <div class="row">
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <template slot="head">
        <h5 class="my-3">今日盈餘</h5>
      </template>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">＄11,000</h4>
      </div>
    </Module>
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <template slot="head">
        <h5 class="my-3">今日收入</h5>
      </template>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">＄11,000</h4>
      </div>
    </Module>
    <Module class="col-12 col-md-4 mb-2 mb-md-0">
      <template slot="head">
        <h5 class="my-3">今日支出</h5>
      </template>
      <div slot="body" class="p-4">
        <h4 class="mb-0 font-weight-normal text-center">＄11,000</h4>
      </div>
    </Module>
  </div>
</template>

<script>
import Module from '@/components/element/Module'
export default {
  name: 'Account',
  components: {
    Module
  }
}
</script>

<style lang="scss" scoped>

</style>
