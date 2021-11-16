<template>
  <div>
    <b-progress :value=value :max=max></b-progress>
  </div>
</template>

<script>
  export default {
    name: "Progressbar",
    data() {
            return {
                value: 35, // hard coded progres bar value
                max: 100   // hard coded progress bar max value
            }
        },
    computed: {
        isDarkMode() {
            return this.$store.state.isDarkMode
        },
    }
  }
</script>

<style scoped>

</style>