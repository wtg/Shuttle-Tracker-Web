<template>
  <b-card v-if="isFsMode" class="mt-3" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">Settings</h3>
    <b-form-checkbox @change="setCbMode" :class="[{'text-white': isDarkMode}]" v-model="isCbMode" name="cbModeSwitch"
                     v-b-tooltip.hover.lefttop :title="cbExplanation" switch>
      Colorblind Mode
    </b-form-checkbox>
    <b-form-checkbox @change="setDarkMode" :class="[{'text-white': isDarkMode}]" v-model="isDark" name="DarkModeSwitch"
                     v-b-tooltip.hover.lefttop :title="darkExplanation" switch>
      Dark Mode
    </b-form-checkbox>
    <b-form-checkbox  @change="setAdvMode" :class="[{'text-white': isDarkMode}]" v-model="isAdvMode" name="AdvModeSwitch"
                      v-b-tooltip.hover.lefttop :title="advSettingsExplanation" switch>
      Enable Advanced Settings
    </b-form-checkbox>
    <b-form-checkbox v-if="devToolsEnabled" v-model="devHQ" name="check-button" switch
                     :class="{'text-white': isDarkMode}">
      Create Fake HQ data: Bus 69
    </b-form-checkbox>
    <b-form-checkbox v-if="devToolsEnabled" v-model="devAnnouncement" name="AnnouncementBarSwitch" switch
                     :class="{'text-white': isDarkMode}">
      Toggle Fake Announcement Bar
    </b-form-checkbox>
  </b-card>
</template>

<script>

import mixin from  '../mixins/mixins.js'

export default {
  name: "Settings",
  mixins: [mixin],
  data() {
    return {
      isCbMode: false,
      isDark: false,
      isAdvMode: false,
      devHQ: false,
      devAnnouncement: false,
      devToolsEnabled: process.env.VUE_APP_DEV_TOOLS_ENABLED === "true",
      // Explanation Message when hovering over setting sliders
      cbExplanation: "Changes the icons of buses to + and ! based on the quality of the bus data",
      darkExplanation: "Switches dark mode on or off",
      advSettingsExplanation: "Enable advanced settings",
    }
  },
  methods: {
    setCbMode() {
      this.$store.commit('setCbMode', this.isCbMode)
    },
    setDarkMode() {
      this.$store.commit('setDarkMode', this.isDark)
    },
    setHQData() {
      this.$store.commit('setFakeHQ', this.devHQ)
    },
    simulateAnnouncementBar() {
      this.$store.commit('fakeAnnouncement', this.devAnnouncement);
    },
    setAdvMode() {
      this.$store.commit('setAdvMode', this.isAdvMode)
    }
  },
  computed: {
    // isDarkMode() {
    //   return this.$store.state.isDarkMode
    // },
    isFsMode() {
      return !this.$store.state.isFsMode
    }
  },
  watch: {
    isDarkMode(val) {
      this.isDark = val // dynamically sync state
    },
    devHQ() {
      this.setHQData()
    },
    devAnnouncement() {
      this.simulateAnnouncementBar();
    }
  },
  mounted() {
    this.isCbMode = this.$store.state.isCbMode  // sync state
    this.isDark = this.$store.state.isDarkMode
    this.isAdvMode = this.$store.state.isAdvMode
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
