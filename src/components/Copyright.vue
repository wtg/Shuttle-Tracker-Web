<template>

  <footer class="text-center" :class="[{'text-white': isDarkMode}]">
    © 2021
    <b-link class="mr-1" :class="[{'text-white': isDarkMode}, {'text-black': !isDarkMode}]"
            href="https://github.com/wtg/Shuttle-Tracker-Web/tree/main">
      Shuttle Tracker
      <b-icon-github class="mb-1" font-scale="1.25"></b-icon-github>
      An RCOS project
    </b-link>
  </footer>
</template>

<script>
import {BIconGithub} from 'bootstrap-vue'

export default {
  name: "Copyright",
  components: {
    BIconGithub
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>
.text-black {
  color: black !important;
}
</style>
