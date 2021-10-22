<template>
  <div>
    <h3 :class="{'text-white': isDarkMode}">
      Fall 2021 Schedule
    </h3>
    <ul :class="{'text-white': isDarkMode}">
      <li> Monday - Friday 7:00 am - 11:45 pm </li>
      <li> Saturday 9:00 am - 11:45 pm </li>
      <li> Sunday  9:00 am - 8:00 pm  </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0px 0px 0px 0px;
  }
</style>