<template>
  <div>
    <h3 :class="{'text-white': isDarkMode}">
      Fall 2021 Schedule
    </h3>
    <ul :class="{'text-white': isDarkMode}">
      <li> Monday - Friday, 7:00 a.m. - 11:45 p.m </li>
      <li> Saturday 9:00 a.m. - 11:45 p.m. </li>
      <li> Sunday 9:00 a.m. - 8:00 p.m.  </li>
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
  li {
    list-style: none;
    font-size: 15px;
    margin-left: -1.5em;
}
li:before {
    content:"·";
    font-size:30px;
    vertical-align:middle;
    line-height:15px;
}
</style>