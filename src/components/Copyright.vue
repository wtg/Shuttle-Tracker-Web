<template>

  <footer v-if="!isFsMode"
  class="text-center" :class="[{'text-white': isDarkMode}]">
    © 2022
    <b-link class="mr-1" :class="[{'text-white': isDarkMode}, {'text-black': !isDarkMode}]"
            href="https://github.com/wtg/Shuttle-Tracker-Web/tree/main">
      Shuttle Tracker
      <b-icon-github class="mb-1" font-scale="1.25"></b-icon-github>
      An RCOS project
    </b-link>
    <div>
      <b-link :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              href="https://shuttletracker.app/swiftui/"
              target="_blank">
        <small>iOS/iPadOS/macOS App</small>
      </b-link>
      <b-link class="mx-3" :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              href="https://shuttletracker.app/android"
              target="_blank">
        <small>Android App</small>
      </b-link>
      <b-link @click="resetAdvMode"
      :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              to="/privacy-policy">
        <small>Privacy Policy</small>
      </b-link>
    </div>
  </footer>
</template>

<script>
import {BIconGithub} from 'bootstrap-vue'
import mixin from '../mixins/mixins.js'

export default {
  name: "Copyright",
  components: {
    BIconGithub
  },
  mixins: [mixin],
  methods: {
    resetAdvMode() {
      // Reset Advanced Mode
      this.$store.commit('setAdvMode', false);
    },
  },
}
</script>

<style scoped>
.text-black {
  color: black !important;
}
.text-gray {
  color: #e3e3e3 !important;
}
</style>
