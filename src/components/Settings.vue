<template>
  <transition name="slide">
  <b-card v-if="!isFsMode" class="h-100" :class="[{'bubble-dark': isDarkMode},{'bubble-light': !isDarkMode}]">
    <h3 :class="{'text-white': isDarkMode}">Settings</h3>
    <b-form-checkbox @change="setCbMode" :class="[{'text-white': isDarkMode}]" v-model="isCbMode" name="cbModeSwitch"
                     v-b-tooltip.hover.lefttop :title="cbExplanation" switch>
      Color-Blind Mode
    </b-form-checkbox>
    <b-form-checkbox @change="setDarkMode" :class="[{'text-white': isDarkMode}]" v-model="isDark" name="DarkModeSwitch"
                     v-b-tooltip.hover.lefttop :title="darkExplanation" switch>
      Dark Mode
    </b-form-checkbox>
    <b-button pill class="mt-1" @click="showLogs" v-b-tooltip.hover.lefttop :title="showLogsExplanation" size="sm">
      Logs
    </b-button>
    <b-form-checkbox v-if="devToolsEnabled || isDevMode" v-model="devHQ" name="check-button"
                     :class="[{'text-white': isDarkMode}, {'dev-setting' : isDevMode}]"
                     v-b-tooltip.hover.lefttop :title="hqExplanation" switch>
      Create Fake HQ data: Bus 69
    </b-form-checkbox>
    <b-form-checkbox v-if="devToolsEnabled || isDevMode" v-model="devAnnouncement" name="AnnouncementBarSwitch" 
                     :class="[{'text-white': isDarkMode}, {'dev-setting' : isDevMode}]"
                     v-b-tooltip.hover.lefttop :title="devAnnoucementExplanation" switch>
      Toggle Fake Announcement Bar
    </b-form-checkbox>
    <b-form-checkbox v-if="devToolsEnabled || isDevMode" v-model="progressBarCompute" name="progressBarSwitch" 
                     :class="[{'text-white': isDarkMode}, {'dev-setting' : isDevMode}]"
                     v-b-tooltip.hover.lefttop :title="progressBarExplanation" switch>
      Toggle Progressbar
    </b-form-checkbox>
    <b-button pill class="mt-1" v-if="devToolsEnabled || isDevMode" @click="uploadLogs" v-b-tooltip.hover.lefttop :title="uploadLogsExplanation" size="sm" style="margin-right: 10px;">
      Manually Upload Logs
    </b-button>
    <b-button pill class="mt-1" :class="[{'text-white': isDarkMode}, {'toggled': isAdvMode}, {'advanced-settings': true}]" variant="secondary" size="sm" @click="toggleAdvMode" v-model="isAdvMode" name="AdvModeSwitch"
                      v-b-tooltip.hover.lefttop :title="isAdvMode ? hideAdvSettingsExplanation:advSettingsExplanation" switch>
      {{isAdvMode?'Hide':'Show'}} Advanced Settings
    </b-button>
    
  </b-card>
</transition>
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
      progressBar: false,
      devToolsEnabled: process.env.VUE_APP_DEV_TOOLS_ENABLED === "true",
      // Explanation Message when hovering over setting sliders
      cbExplanation: "Changes the icons of buses to + and ! based on the quality of the bus data",
      darkExplanation: "Switches dark mode on or off",
      hqExplanation: "Creake a fake \"Bus 69\" Data",
      devAnnoucementExplanation: "Show fake annoucements",
      advSettingsExplanation: "Show advanced settings",
      hideAdvSettingsExplanation: "Hide advanced settings",
      progressBarExplanation: "Show progress bar on how many buses were collected",
      showLogsExplanation: "Shows recent logging information",
      uploadLogsExplanation: "Manually upload the logs"
    }
  },
  methods: {
    /**
     * @brief Sets the state for Colorblind mode
     */
    setCbMode() {
      this.$store.commit('setCbMode', this.isCbMode)
      this.$store.commit('enqueueLog', "Toggled colorblind mode to " + this.isCbMode + ".");
    },
    /**
     * @brief Sets the state for Dark mode
     */
    setDarkMode() {
      this.$store.commit('setDarkMode', this.isDark)
      this.$store.commit('enqueueLog', "Toggled dark mode to " + this.isDark + ".");
    },
    /**
     * @brief Shows logs.
     */
    showLogs() {
      this.$store.commit('showLogModal', true);
    },
    /**
     * @brief Sets the state for Dev mode
     */
    setHQData() {
      this.$store.commit('setFakeHQ', this.devHQ)
    },
    /**
     * @brief Sets the state for the fake Announcement
     */
    simulateAnnouncementBar() {
      this.$store.commit('fakeAnnouncement', this.devAnnouncement);
    },
    /**
     * @brief Sets the state for Advanced mode
     */
    setAdvMode() {
      this.$store.commit('setAdvMode', this.isAdvMode)
    },
    /**
     * @brief sets the opposite state for Advanced mode
     */
    toggleAdvMode() {
      this.isAdvMode = ! this.isAdvMode;
      this.setAdvMode()
    },
    /**
     * @brief Upload the logs in the log buffer. 
     */
    uploadLogs() {
      this.$store.commit('uploadLogs');
    },
        /**
     * @brief Sets the state for the fake progressbar
     */
  },
  watch: {
    /**
     * @brief Dynamically syncs the state
     * @param val the dark mode state
     */
    isDarkMode(val) {
      this.isDark = val
    },
    /**
     * @brief Calls the setHQData method
     */
    devHQ() {
      this.setHQData()
    },
    /**
     * @brief Calls the simulateAnnouncementBar method
     */
    devAnnouncement() {
      this.simulateAnnouncementBar();
    },
    /**
     * @brief Calls the setProgressBar method
     */
  },
  mounted() {
    this.isCbMode = this.$store.state.isCbMode  // sync state
    this.isDark = this.$store.state.isDarkMode
    this.isAdvMode = this.$store.state.isAdvMode
    this.progressBar = this.$store.state.progressBar
  },
  computed: {
    progressBarCompute: {
      get() {
        return this.$store.state.progressBar;
      },
      set(value) {
        this.$store.commit('setProgressBar', value);
      }
    },
    isDevMode() {
      return this.$store.state.devMode;
    },
  },

}
</script>

<style scoped>

.card {
  border-radius: 7px;
  animation: slide 0.5s;
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

.advanced-settings {
  /* outline: none !important; */
  outline:none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
  /* margin- */
  /* margin-left: 40px; */
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(0);
}

.slide-enter-to, .slide-leave /* .slide-leave-active in <2.1.8 */ {
  transform: translateX(-100%);
}
.dev-setting {
  animation: slideDown 1s ease forwards;
  -webkit-animation: slideDown 1s ease forwards;
  -o-animation: slideDown 1s ease forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;  
  }
}

@-webkit-keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;  
  }
}

@-o-keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0%);
    opacity: 1;  
  }
}
</style>
