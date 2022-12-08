<template>
  <!-- If showStatus button is toggled, show the Server Status Button. Else, show the explanced Server Status Buttons-->
  <div v-if="showStatus">
    <b-badge role="button" @click="toggleExpand" v-if="!expanded" class="mr-1"
             :variant="totalServerStatus ? 'success': 'danger'" v-b-tooltip.hover :title="statusDescription">
      Server: {{ totalServerStatus ? 'Online' : 'Offline' }}
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
      <b-badge role="button" @click="toggleExpand" class="mx-1" :variant="serverStatus.schedule ? 'success': 'danger'"
               v-b-tooltip.hover :title="compStatus">
        Schedule
      </b-badge>
      <b-badge role="button" @click="toggleExpand" class="mx-1" :variant="serverStatus.version ? 'success': 'danger'"
               v-b-tooltip.hover :title="APIWarning">
        API
      </b-badge>
    </div>
    <b-badge v-if="!isOfficialURL" role="button" class="mx-1" variant="warning" v-b-tooltip.hover :title="NonOfficialWarning">Non-Official API</b-badge>
  </div>
</template>

<script>

export default {
  name: "Status",
  data() {
    return {
      expanded: false,
      // Explanation of Server Status Buttons
      compStatus: "If the badge is green, this component is working!",
      APIWarning: "If the badge is red, the app may be broken. You have been warned.",
      NonOfficialWarning: "You are using the non-official API, which may result in broken features.",
      statusDescription: "Click to see detailed report on server status.",
      // Stores the state of whether the server is working
      showStatus: true
    }
  },
  computed: {
    /**
     * Checks if the official API is being used
     * @return{boolean} returns true is api is official. Else return False 
     */
    isOfficialURL() {
      return this.$store.state.isOfficialURL
    },
    /**
     * Checks each separate status to determine server status
     * @return{boolean} False if at least one of the statuses are offline. Else True
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
  methods: {
    /**
     * Toggles the list of all four difference server statuses
     */
    toggleExpand() {
      this.expanded = !this.expanded
    }
  },
  watch: {
    '$store.state.showIcons': function() {
      this.showStatus = this.$store.state.showIcons;
    }
  }
}
</script>

<style scoped>

</style>
