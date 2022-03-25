<template>
  <b-card v-if="isFsMode" class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      {{currentSemester}} Schedule
    </h3>
    <ul :class="{'text-white': isDarkMode}">
      <li> Monday - Friday {{currentWeek.monday.start}} - {{currentWeek.monday.end}}</li>
      <li> Saturday {{currentWeek.saturday.start}} - {{currentWeek.saturday.end}}</li>
      <li> Sunday {{currentWeek.sunday.start}} - {{currentWeek.sunday.end}}</li>
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
      schedules: [],
      currentWeek: {
			"monday": {
				"start": "01:00",
				"end": "23:00"
			},
			"tuesday": {
				"start": "01:00",
				"end": "23:00"
			},
			"wednesday": {
				"start": "01:00",
				"end": "23:00"
			},
			"thursday": {
				"start": "01:00",
				"end": "23:00"
			},
			"friday": {
				"start": "01:00",
				"end": "23:00"
			},
			"saturday": {
				"start": "01:00",
				"end": "23:00"
			},
			"sunday": {
				"start": "01:00",
				"end": "23:00"
			}
		},
      currentSemester: "Spring 2022"
    };
  },
  /**
   * Checks if in dark mode
   * @return{boolean} The dark mode status
   */
  computed: {
    baseURL() {
      return this.$store.state.baseURL
    },
    // isDarkMode() {
    //   return this.$store.state.isDarkMode
    // },
    isFsMode() {
      return !this.$store.state.isFsMode
    }
  },
  methods: {
    /**
     * Gets and loops through API. Puts schedule from range into variables.
     */
    async getCurrentSemester() {

      // Gets API
      const response = await axios.get(this.baseURL + "/schedule.json")

      // API goes in here
      this.schedules = response.data


      const current = new Date();

      // Checking if current time is between schedule start and end dates
      for (let i = 0; i < this.schedules.length; i++) {
        if (this.schedules[i].start <= current.toISOString() && this.schedules[i].end >= current.toISOString()) {
          this.currentWeek = this.schedules[i].content;
          this.currentSemester = this.schedules[i].name;
          break;
        }
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
</style>
