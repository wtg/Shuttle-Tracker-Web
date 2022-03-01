<template>
  <b-card class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      {{currentSemester}} Schedule
    </h3>
    <ul :class="{'text-white': isDarkMode}">
      <li> Monday - Friday {{currentWeek.monday.start}} am - {{currentWeek.monday.end}} pm</li>
      <li> Saturday {{currentWeek.saturday.start}} am - {{currentWeek.saturday.end}} pm</li>
      <li> Sunday {{currentWeek.sunday.start}} am - {{currentWeek.sunday.end}} pm</li>
    </ul>
  </b-card>
</template>

<script>
import axios from 'axios'

export default {
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
      currentSemester: undefined
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
  methods: {
    async getCurrentSemester() {
      const response = await axios.get("https://shuttletracker.app/schedule.json")

      this.schedules = response.data

      const current = new Date();

      for (let i = 0; i < this.schedules.length; i++) {
        if (this.schedules[i].start <= current.toISOString() && this.schedules[i].end >= current.toISOString()) {
          this.currentWeek = this.schedules[i].content;
          this.currentSemester = this.schedules[i].name;
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
