<template>
  <b-card class="mt-3" @click="incrementCounter" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">Advanced Settings</h3>
    <b-form-group :label-class="{'text-white': isDarkMode}" label="Server Base URL" label-for="input-custom-api">
      <b-form-input @change="setBaseURL" id="input-custom-api" v-model="customAPI" size="sm" placeholder="https://shuttletracker.app" debounce="500"></b-form-input>
    </b-form-group>
  </b-card>
</template>

<script>
import mixin from '../mixins/mixins.js'

export default {
  name: "AdvanceSettings",
  mixins: [mixin],
  data() {
    return {
      customAPI: '',
      counter: 0,
    }
  },
  computed: {
    isAdvMode() {
      return this.$store.state.isAdvMode
    },
    isDevMode() {
      return this.$store.state.devMode;
    }
  },
  watch: {
  },
  methods: {
    // change custom API URL
    setBaseURL() {
      if (this.customAPI.trim() === '') {
        this.$store.commit('restoreBaseURL');
        // can customize code for developer's settings to show up
      } else if (this.customAPI.trim() == 'devMode') {
        if (this.counter >= 10) {
          this.$store.commit('setDevMode', true);
          this.counter = 0;
        }
      }
      else {
        this.$store.commit('setBaseURL', this.customAPI)
      }
    },
    incrementCounter() {
      this.counter++;
    }
  },
}
</script>

<style scoped>

.card {
  border-radius: 7px;
}
.card-body {
  padding: 1rem;
  opacity: 0.8;
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
