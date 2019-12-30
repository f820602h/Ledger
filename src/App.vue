<template>
  <div id="app">
    <div class="container py-5">
      <router-view/>
    </div>
    <div class="replace"></div>
    <ActionBar />
  </div>
</template>

<script>
import ActionBar from '@/components/utility/ActionBar'
export default {
  name: 'App',
  components: {
    ActionBar
  }
}
</script>

<style lang="scss" scoped>
  .replace{
    height: 100px;
  }
</style>
