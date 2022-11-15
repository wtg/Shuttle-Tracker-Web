<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 :class="{'text-white': isDarkMode}">Dashboard</h1>
        </div>
      </div>
      <div class="row">
        <div class="col" :class="{'text-white': isDarkMode}">
          <Tracker :trace_history="true"></Tracker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "../mixins/mixins";
import Tracker from "../components/Tracker";

export default {
  name: "Dashboard",
  components: {
    Tracker
  },
  mixins: [mixin],
}
</script>

<style scoped>

</style>
