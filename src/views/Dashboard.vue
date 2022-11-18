<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="display-4" :class="{'text-white': isDarkMode}">
            Shuttle Tracker <span class="text-muted h4">Dashboard</span>
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col" :class="{'text-white': isDarkMode}">
          <Tracker :trace_history="true"></Tracker>
        </div>
      </div>
    </div>
    <div class="col mt-4" :class="{'text-white': isDarkMode}">
      <Copyright></Copyright>
    </div>
  </div>
</template>

<script>
import mixin from "../mixins/mixins";
import Tracker from "../components/Tracker";
import Copyright from "../components/Copyright";

export default {
  name: "Dashboard",
  components: {
    Tracker,
    Copyright,
  },
  mixins: [mixin],
}
</script>

<style scoped>

</style>
