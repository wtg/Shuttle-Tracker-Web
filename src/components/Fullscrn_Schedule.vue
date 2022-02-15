<template>
  <b-card
    class="mt-3"
    :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]"
  >
    <h3 :class="{ 'text-white': isDarkMode }">Shuttle Schedule</h3>
    <ul :class="{ 'text-white': isDarkMode }">
      <li>Mon-Fri: 7am - 11:45pm</li>
      <li>Sat: 9am - 11:45pm</li>
      <li>Sun: 9am - 8pm</li>
    </ul>
  </b-card>
</template>

<script>
export default {
  name: "Fullscrn_schedule",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 22px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  font-size: 15px;
}

.card {
  border-radius: 7px;
}

.card-body {
  padding: 0.5rem;
}

.bubble-light {
  background-color: rgb(235, 235, 235,0.75);
  border-color: rgba(235, 235, 235, 0.75);
}

.bubble-dark {
  background-color: rgb(71, 71, 71, 0.8);
  border-color: rgb(71, 71, 71, 0.8);
}
</style>
