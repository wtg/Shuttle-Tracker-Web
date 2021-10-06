<template>
  <div>
    <b-badge class="mx-1" :variant="serverStatus.routes ? 'success': 'danger'">Routes</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'">Stops</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'">Buses</b-badge>
    <div class="custom-control custom-switch" id="emojitoggle">
      <input type="checkbox" class="custom-control-input" id="colorblindSwitch">
      <label class="custom-control-label" for="colorblindSwitch">Colorblind mode</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
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
