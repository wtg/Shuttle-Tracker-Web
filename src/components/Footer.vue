<template>
  <div :class="[{'text-white': isDarkMode}]">
    <span style="float: left">This map refreshes every 5 seconds.</span>
    <span style="float: right;">
      <a href="https://shuttletracker.app/swiftui"> iOS/iPadOS/macOS App</a>
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
 div {
   padding-top: 5px;
   padding-left: 5px;
   padding-right: 5px;
 }
</style>
