<template>
  <b-card class="h-100" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      {{ !isCurrent ? 'No Current Schedule' : currentSemester + ' Schedule' }}
    </h3>
    <ul v-if="isCurrent" :class="{'text-white': isDarkMode}">
      <li> Weekdays: {{currentWeek.monday.start}} - {{currentWeek.monday.end}}</li>
      <li> Saturday:<span class='saturday-times'>{{currentWeek.saturday.start}} - {{currentWeek.saturday.end}}</span></li>
      <li> Sunday:<span class='sunday-times'>{{currentWeek.sunday.start}} - {{currentWeek.sunday.end}}</span></li>
    </ul>
    <br>
    <table border="1" :class="{'text-white': isDarkMode}" style="font-size: 11px; width: 100%;">
      <thead>
        <tr>
          <th>Weekdays</th>
          <th>7:00AM - 12:00PM</th>
          <th>12:00PM - 8:00PM</th>
          <th>8:00PM - 9:30PM</th>
          <th>10:00PM - 12:00AM</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>North Shuttle</b></td>
          <td>Every 10 min</td>
          <td>Every 15 min</td>
          <td>Every 15 - 45 min</td>
          <td>Every 15 min</td>
        </tr>
        <tr>
          <td><b>West Shuttle</b></td>
          <td>Every 7 min</td>
          <td>Every 11 min</td>
          <td>Every 15+ min</td>
          <td>Every 15+ min</td>
        </tr>
      </tbody>
    </table>
    <br>
    <div style="display: flex; justify-content: space-between;">
      <div style="width: 5%;" />
      <table border="1" :class="{'text-white': isDarkMode}" style="font-size: 11px; width: 40%">
        <thead>
          <tr>
            <th>Saturdays</th>
            <th>9:00AM - 12:00PM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>North Shuttle</b></td>
            <td>Every 13 min</td>
          </tr>
          <tr>
            <td><b>West Shuttle</b></td>
            <td>Every 11 min</td>
          </tr>
        </tbody>
      </table>
      <table border="1" :class="{'text-white': isDarkMode}" style="font-size: 11px; width: 40%">
        <thead>
          <tr>
            <th>Sundays</th>
            <th>9:00AM - 8:00PM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>North Shuttle</b></td>
            <td>Every 13 min</td>
          </tr>
          <tr>
            <td><b>West Shuttle</b></td>
            <td>Every 11 min</td>
          </tr>
        </tbody>
      </table>
      <div style="width: 5%;" />
    </div>
  </b-card>
</template>

<script>
import axios from 'axios'
import mixin from  '../mixins/mixins.js'

export default {
  mixins: [mixin],
  data() {
    return {
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
     * Gets and loops through API. Puts schedule from range into variables.
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
