<template>
  <div v-if="isFsMode">
    <h1 class="display-4" :class="{'text-white': isDarkMode}">
      Shuttle Tracker <span v-if="showBeta" class="text-muted h4">BETA</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showBeta: process.env.VUE_APP_IS_BETA === "true"
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    isFsMode() {
      return !this.$store.state.isFsMode
    }
  }
}
</script>

<style scoped>

</style>
