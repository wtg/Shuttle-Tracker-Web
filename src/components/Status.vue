<template>
  <div>
    <b-badge class="mx-1" :variant="serverStatus.routes ? 'success': 'danger'" v-bind:title="compStatus">Routes</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'" v-bind:title="compStatus">Stops</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'" v-bind:title="compStatus">Buses</b-badge>
    <div class="custom-control custom-switch" id="emojitoggle">
      <input type="checkbox" class="custom-control-input" id="colorblindSwitch">
      <label class="custom-control-label" for="colorblindSwitch" v-bind:title="cbExplanation">Colorblind mode</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  data: function() {
    return {
      cbExplanation: "Changes the emoji of low-quality (red) buses to 🚌 to differentiate from high-quality buses",
      compStatus: "If the badge is green, this component is working!"
    }
  },
  computed: {
    serverStatus() {
      return this.$store.state.serverStatus
    }
  }
}
</script>

<style scoped>
#emojitoggle {
  float: right;
}
</style>
