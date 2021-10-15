<template>

  <footer class="text-center" :class="[{'text-white': isDarkMode}]">
     © 2021
    <a class="mr-1" :class="[{'text-white': isDarkMode}]" href="https://staging.web.shuttletracker.app">Shuttle Tracker</a>
    <a class="mx-1" :class="[{'text-white': isDarkMode}]" href="https://github.com/wtg/Shuttle-Tracker-Web">
      <i class="fab fa-github" ></i>
    </a>
    <a class="ml-1" :class="[{'text-white': isDarkMode}]" href="https://rcos.io">An RCOS Project</a>
  </footer>
</template>

<script>
export default {
  name: "Copyright",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>
a {
  color: black;
  text-decoration:none
}
</style>