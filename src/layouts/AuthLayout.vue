<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      console.log("FIREBASE_ERROR_CODE:" + fbError.code);
      this.$toastError(messages[fbError.code] || messages.default);
    },
  },
};
</script>