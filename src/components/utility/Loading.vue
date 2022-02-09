<template>
  <div v-if="loading" class="loading">
    <div class="box">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Loading",
  computed: {
    ...mapState(["loading"])
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  .box {
    display: flex;

    .dot {
      width: 8px;
      height: 8px;
      margin: 4px;
      border-radius: 50%;
      background: #fff;
      animation: fade 1s infinite;

      &:nth-child(2) {
        animation-delay: 0.33s;
      }
      &:nth-child(3) {
        animation-delay: 0.66s;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
