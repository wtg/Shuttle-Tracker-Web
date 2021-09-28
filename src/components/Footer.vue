<template>
  <div :class="[{'text-white': isDarkMode}]">
    This map refreshes every 5 seconds.
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>

</style>
