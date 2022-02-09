<template>
  <div id="app">
    <UserBar v-if="isLoginPage" />
    <div class="container pt-2 pb-4">
      <router-view />
    </div>
    <div class="replace"></div>
    <ActionBar @toggleAddPopup="toggleAddPopup" v-if="isLoginPage" />
    <AddPopup v-if="AddPopupIsShow" @toggleAddPopup="toggleAddPopup" />
    <Loading />
  </div>
</template>

<script>
import UserBar from "@/components/modules/UserBar";
import ActionBar from "@/components/utility/ActionBar";
import AddPopup from "@/components/utility/AddPopup";
import Loading from "@/components/utility/Loading";
export default {
  name: "App",
  data() {
    return {
      AddPopupIsShow: false
    };
  },
  components: {
    UserBar,
    ActionBar,
    AddPopup,
    Loading
  },
  computed: {
    isLoginPage() {
      return this.$route.path !== "/";
    }
  },
  methods: {
    toggleAddPopup(state) {
      this.AddPopupIsShow = state;
      document.body.style.overflow = state ? "hidden" : "";
    }
  }
};
</script>

<style lang="scss">
body,
html {
  width: 100%;
  margin: 0;
  padding: 0;
}
button {
  outline: none !important;
}
button:focus {
  outline: none !important;
}
</style>
<style lang="scss" scoped>
.replace {
  height: 100px;
}
</style>
