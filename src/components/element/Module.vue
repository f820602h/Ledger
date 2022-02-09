<template>
  <div>
    <div class="rounded overflow-hidden bg-white">
      <div class="px-4 border-bottom">
        <slot name="head" />
      </div>
      <div>
        <slot name="body" />
      </div>
      <div class="px-4 border-top" v-if="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module",
  props: {
    footer: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss"></style>
