<template>
  <div>
    <div class="rounded overflow-hidden" :class="color">
      <div class="px-4 border-bottom">
        <slot name="head"/>
      </div>
      <div>
        <slot name="body"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module',
  props: {
    color: {
      type: String,
      default: 'bg-white'
    }
  }
}
</script>

<style lang="scss">
</style>
