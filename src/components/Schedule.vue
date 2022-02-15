<template>
  <b-card class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">
      Spring 2022 Schedule
    </h3>
    <ul :class="{'text-white': isDarkMode}">
      <li> Monday - Friday 7:00 am - 11:45 pm</li>
      <li> Saturday 9:00 am - 11:45 pm</li>
      <li> Sunday 9:00 am - 8:00 pm</li>
    </ul>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      schedules: [],
      currentSemester: "Undefined",
      currentSchedule: [],
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
  methods: {
    async getData() {
      try {
        const response = await this.$http.get(
          "https://shuttletracker.app/schedule.json"
        );
        this.schedules = response.schedules;
      }
      catch (error) {
        //console.log(error);
      }
    },
    currentDate() {
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      return date;
    },
    compareDates(sched) {
      const current = currentDate().getTime();
      const before = sched.start.getTime();
      const after = sched.end.getTime();
      if (before <= current && current <= after)
        return true;
      
      return false;
    },
    checkDate() {
      const date = currentDate();
      for (i = 0; i < this.schedules.length; i++) {
        if (compareDates(this.schedules[i])) {
          this.currentSemester = this.schedules[i].name;
          for (j = 0; j < 7; j++)
            this.currentSchedule[j] = this.schedules[i].content[j];
        }
      }
    },
    
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
