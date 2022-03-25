<template>
  <div v-if="isFsMode">
    <h1 class="display-4" :class="{'text-white': isDarkMode}">
      Shuttle Tracker <span v-if="showBeta" class="text-muted h4">BETA</span>
    </h1>
  </div>
</template>

<script>
import mixin from '../mixins/mixins.js'

export default {
  name: "Header",
  mixins: [mixin],
  data() {
    return {
      showBeta: process.env.VUE_APP_IS_BETA === "true"
    }
  },
  computed: {
    /**
     * Checks if in dark mode
     * @return{boolean} The dark mode status
     */
    // isDarkMode() {
    //   return this.$store.state.isDarkMode
    // },
    /**
     * Checks if in fullscreen mode
     * @return{boolean} The fullscreen status
     */
    isFsMode() {
      return !this.$store.state.isFsMode
    }
  }
}
</script>

<style scoped>

</style>
