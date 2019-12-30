<template>
  <div class="actionBar fixed-bottom bg-dark">
    <h2 class="add rounded-circle text-white d-flex justify-content-center align-items-center">＋</h2>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.actionBar{
  height: 55px;
  .add{
    background: #272b30;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 80px;
    height: 80px;
    margin: auto;
    cursor: pointer;
  }
}
</style>
