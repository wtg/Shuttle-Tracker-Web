<template>
  <b-card v-if="isFsMode" class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">Advance Settings</h3>
  </b-card>
</template>

<script>
export default {
  name: "AdvanceSettings",
  data() {
    return {
      devToolsEnabled: process.env.VUE_APP_DEV_TOOLS_ENABLED === "true",
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    isFsMode() {
      return !this.$store.state.isFsMode
    },
    isAdvMode() {
      return this.$store.state.isAdvMode
    },
  },
  watch: {
    isDarkMode(val) {
      this.isDark = val // dynamically sync state
    }
  }
}
</script>

<style scoped>

.card {
  border-radius: 7px;
}
.card-body {
  padding: 1rem;
  opacity: 0.8;
}
.bubble-light {
  background-color: rgb(235, 235, 235);
  border-color: rgb(235, 235, 235);
}

.bubble-dark {
  background-color: rgb(71, 71, 71);
  border-color: rgb(71, 71, 71);
}
</style>
