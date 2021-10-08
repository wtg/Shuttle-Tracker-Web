<template>
  <div>
    <b-badge class="mx-1" :variant="serverStatus.routes ? 'success': 'danger'" v-bind:title="compStatus">Routes</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'" v-bind:title="compStatus">Stops</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'" v-bind:title="compStatus">Buses</b-badge>
  </div>
</template>

<script>
export default {
  name: "Status",
  data: function() {
    return {
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

</style>
