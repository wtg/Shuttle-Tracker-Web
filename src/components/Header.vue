<template>
  <div v-if="!isFsMode">
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
      /**
       * showBeta is used to determine if the beta version of title should be shown 
       */
      showBeta: process.env.VUE_APP_IS_BETA === "true"
    }
  }
}
</script>

<style scoped>

</style>
