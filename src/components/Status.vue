<template>
  <div>
    <b-badge class="mx-1" :variant="serverStatus.routes ? 'success': 'danger'">Routes</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'">Stops</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'">Buses</b-badge>
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

</style>
