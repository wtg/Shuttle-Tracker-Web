<template>
  <div>
    <h3>
      Settings
    </h3>
    <div class="custom-control custom-switch" :class="{'text-white': isDarkMode}" id="colorblindToggle">
      <input type="checkbox" class="custom-control-input" id="colorblindSwitch">
      <label class="custom-control-label" for="colorblindSwitch" v-bind:title="cbExplanation">Colorblind mode</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data: function() {
    return {
      cbExplanation: "Changes the icons of buses to H and L based on the quality of the bus data",
    }
  },
  computed: {
    serverStatus() {
      return this.$store.state.serverStatus
    },
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>

</style>
