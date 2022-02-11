<template>
  <div>
    <b-badge role="button" @click="toggleExpand" v-if="!expanded" class="mr-1"
             :variant="totalServerStatus ? 'success': 'danger'" v-b-tooltip.hover :title="statusDescription">
      Server: {{ totalServerStatus ? 'online' : 'offline' }}
    </b-badge>
    <div v-else>
      <b-badge role="button" @click="toggleExpand" class="mr-1" :variant="serverStatus.routes ? 'success': 'danger'"
               v-b-tooltip.hover :title="compStatus">
        Routes
      </b-badge>
      <b-badge role="button" @click="toggleExpand" class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'"
               v-b-tooltip.hover :title="compStatus">
        Stops
      </b-badge>
      <b-badge role="button" @click="toggleExpand" class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'"
               v-b-tooltip.hover :title="compStatus">
        Buses
      </b-badge>
      <b-badge role="button" @click="toggleExpand" class="mx-1" :variant="serverStatus.version ? 'success': 'danger'"
               v-b-tooltip.hover :title="APIWarning">
        API
      </b-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      expanded: false,
      compStatus: "If the badge is green, this component is working!",
      APIWarning: "If the badge is red, the app may be broken. You have been warned.",
      statusDescription: "Click to see detailed report on server status."
    }
  },
  computed: {
    /**
     * Checks each separate status to determin server status
     * @return{boolean} False if at least one of the statuses are offline
     */
    totalServerStatus() {
      let status = true
      Object.values(this.serverStatus).forEach((option) => {
        if (!option) {
          status = false
        }
      })
      return status
    },
    /**
     * Sets the server status
     * @return{boolean} The current server status
     */
    serverStatus() {
      return this.$store.state.serverStatus
    },
    /**
     * Checks if in dark mode
     * @return{boolean} The dark mode status
     */
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
  /**
   * Toggles the list of all four difference server statuses
   */
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped>

</style>
