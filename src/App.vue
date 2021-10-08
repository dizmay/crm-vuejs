<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import M from "materialize-css";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || "auth"}-layout`;
    },
  },
  components: {
    AuthLayout,
    MainLayout,
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style lang="scss" scoped>
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
