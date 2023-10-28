<template>
  <b-card class="h-100" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      {{ !isCurrent ? 'No Current Schedule' : currentSemester + ' Schedule' }}
    </h3>
    <ul v-if="isCurrent" :class="{'text-white': isDarkMode}">
      <li :class="{ 'bold-day': currentDay === 'weekdays' }" id="weekdaysLi">
        <div class="pin-container">
          <img v-if="currentDay === 'weekdays'" src="../../public/map-marker.png">
        </div>
        Weekdays: {{ currentWeek.monday.start }} - {{ currentWeek.monday.end }}
      </li>
      <li :class="{ 'bold-day': currentDay === 'saturday' }" id="saturdayLi">
        <div class="pin-container">
          <img v-if="currentDay === 'saturday'" src="../../public/map-marker.png">
        </div>
        Saturday: <span class="saturday-times">{{ currentWeek.saturday.start }} - {{ currentWeek.saturday.end }}</span>
      </li>
      <li :class="{ 'bold-day': currentDay === 'sunday' }" id="sundayLi">
        <div class="pin-container">
          <img v-if="currentDay === 'sunday'" src="../../public/map-marker.png">
        </div>
        Sunday: <span class="sunday-times">{{ currentWeek.sunday.start }} - {{ currentWeek.sunday.end }}</span>
      </li>
    </ul>
    <b-form-group :label-class="{'text-white': isDarkMode}" v-if="!available" label="RPI Shuttle Service is currently unavailable at the moment." style="margin-top:5px;"></b-form-group>
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
      currentSemester: undefined,
      currentDay: 'undefined',
      available: true
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

    },
    highlightCurrentSchedule() {
      // Checks what day of the week is today and highlight the schedule accordingly
      const current = new Date();
      const day = current.getDay();
      const hour = current.getHours();
      if (day === 0) {
        if (hour >= 9 && hour < 20) {
          this.currentDay = 'sunday';
        } else {
          this.available = false;
        }
      } 
      if (day === 6) {
        if (hour >= 9)
          this.currentDay = 'saturday';
        else
         this.available = false;
      } 
      if (day > 0 && day < 6) {
        if (hour >= 7)
          this.currentDay = 'weekdays';
        else
          this.available = false;
      } 
    }
  },
  mounted () {
    this.getCurrentSemester();
    this.highlightCurrentSchedule();
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
}

img {
  height: 20px;
  width: 20px;
}
.pin-container {
  width: 20px;
  margin-right: 5px;
}
.bold-day {
  font-weight: bold;
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
