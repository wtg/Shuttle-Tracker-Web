<template>
  <!--Schedule is dynamically updated from through API. The shuttle schedules are
     updated from the server side so any errors with the schedule times might
     require communication with server team-->
  <b-card class="h-100" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      {{ !isCurrent ? 'No Current Schedule' : currentSemester + ' Schedule' }}
    </h3>
    <ul v-if="isCurrent" :class="{'text-white': isDarkMode}">
      <li> Weekdays: {{currentWeek.monday.start}} - {{currentWeek.monday.end}}</li>
      <li> Saturday:<span class='saturday-times'>{{currentWeek.saturday.start}} - {{currentWeek.saturday.end}}</span></li>
      <li> Sunday:<span class='sunday-times'>{{currentWeek.sunday.start}} - {{currentWeek.sunday.end}}</span></li>
    </ul>
  </b-card>
</template>

<script>
import axios from 'axios'
import mixin from  '../mixins/mixins.js'

export default {
  mixins: [mixin],
  data() {
    return {
      // stores the schedule retrieved from API call
      schedules: [],
      currentWeek: undefined,
      currentSemester: undefined
    };
  },
  computed: {
    /**
     * @brief Returns the base URL
     * @return the state of baseURL
     */
    baseURL() {
      return this.$store.state.baseURL
    },
    /**
     * @return if there is no current schedule
     */
    isCurrent() {
      return !(this.currentWeek === undefined)
    }
  },
  methods: {
    /**
     * Calls API to get shuttle schedule information. Verifies the schedule is correct
     * by checking if the current date falls in the schedule's start and end date. If
     * so, set currentWeek and currentSemester to the contents of the API call. Else,
     * set schedule to false.
     */
    async getCurrentSemester() {
      // Gets API
      try {
        // API call
        const response = await axios.get(this.baseURL + "/schedule.json")
        this.schedules = response.data

        // Checking if current time is between schedule start and end dates
        const current = new Date();
        for (let i = 0; i < this.schedules.length; i++) {
          if (this.schedules[i].start <= current.toISOString() && this.schedules[i].end >= current.toISOString()) {
            this.currentWeek = this.schedules[i].content;
            this.currentSemester = this.schedules[i].name;
            break;
          }
        }
      } catch {
        this.$store.commit("setServerStatus", { schedule: false });
      }

    }
  },
  mounted () {
    this.getCurrentSemester();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.card {
  border-radius: 7px;
}

.card-body {
  padding: 1rem;
}

.bubble-light {
  background-color: rgb(235, 235, 235);
  border-color: rgb(235, 235, 235);
}

.bubble-dark {
  background-color: rgb(71, 71, 71);
  border-color: rgb(71, 71, 71);
}

.saturday-times {
  margin-left: 13.5px;
}

.sunday-times {
  margin-left: 23.5px;
}
</style>
