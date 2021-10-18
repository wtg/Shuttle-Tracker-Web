<template>
  <div>
    <b-badge class="mr-1" :variant="serverStatus.routes ? 'success': 'danger'" v-b-tooltip.hover :title="compStatus">Routes</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.stops ? 'success': 'danger'" v-b-tooltip.hover :title="compStatus">Stops</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.buses ? 'success': 'danger'" v-b-tooltip.hover :title="compStatus">Buses</b-badge>
    <b-badge class="mx-1" :variant="serverStatus.version ? 'success': 'danger'" v-b-tooltip.hover :title="APIWarning">API</b-badge>
    <b-form-checkbox v-model="devHQ" name="check-button" switch :class="{'text-white': isDarkMode}">
      Create Fake HQ data: Bus 69
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      compStatus: "If the badge is green, this component is working!",
      APIWarning: "If the badge is red, the app may be broken. You have been warned.",
      devHQ: false
    }
  },
  methods: {
    setHQData() {
      this.$store.commit('setFakeHQ', this.devHQ)
    }
  },
  watch: {
    devHQ () {
      this.setHQData()
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
