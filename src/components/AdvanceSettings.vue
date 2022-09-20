<template>
  <b-card v-if="!isFsMode" class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">Advanced Settings</h3>
<!--    <label for="input-custom-api">Custom API:</label><b-form-input id="input-custom-api" size="sm">HELLO</b-form-input>-->
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
      customAPI: ''
    }
  },
  computed: {
    isAdvMode() {
      return this.$store.state.isAdvMode
    }
  },
  watch: {
    isDarkMode(val) {
      this.isDark = val // dynamically sync state
    }
  },
  methods: {
    // change custom API URL
    setBaseURL() {
      if (this.customAPI.trim() === '') {
        this.$store.commit('restoreBaseURL')
      } else {
        this.$store.commit('setBaseURL', this.customAPI)
      }
    }
  }
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
