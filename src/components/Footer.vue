<template>
  <div :class="[{'text-white': isDarkMode}]">
    <span style="float: left">This map refreshes every 5 seconds.</span>
    <span style="float: right;">
      <a href="https://testflight.apple.com/join/GsmZkfgd">Download iOS app</a>
    </span>
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
