<template>
  <div class="actionBar fixed-bottom bg-dark">
    <h2
      class="add rounded-circle text-white d-flex justify-content-center align-items-center"
      @click="toggleAddPopup(true)"
    >
      ＋
    </h2>
  </div>
</template>

<script>
export default {
  name: "ActionBar",
  methods: {
    toggleAddPopup(state) {
      this.$emit("toggleAddPopup", state);
    }
  }
};
</script>

<style lang="scss" scoped>
.actionBar {
  height: 55px;
  .add {
    background: #343a40;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 80px;
    margin: auto;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      background: #272b30;
    }
  }
}
</style>
