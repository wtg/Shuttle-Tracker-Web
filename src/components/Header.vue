<template>
  <div>
    <h1 class="display-4" :class="{'text-white': isDarkMode}">
      Shuttle Tracker <span class="text-muted h4">BETA</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>

</style>
