<template>
  <b-modal title="Welcome to the new Shuttle Tracker!" :header-text-variant="themeText" :footer-bg-variant="themeBg"
           :header-bg-variant="themeBg" :body-bg-variant="themeBg" ref="instructionModal" ok-only ok-title="Continue">
    <div :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]">
      <p> You're using the new Web interface for the <i>
        new </i> Shuttle Tracker. We've completely overhauled every component to bring superior accuracy.
      </p>
      <p> Green Buses indicates accurate
        location data while red buses show low quality location data. When Color-Blind Mode is toggled, a scope icon will
        indicate high-quality location data.
      </p>
      <p> If you use iPhone, then you can
        help out with crowd-sourced location data. Download our new beta app today! Click on "iOS App" link located on the
        bottom right hand corner of the map for more information.
      </p>
      <p><i> Our Android app is coming soon!</i></p>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: "Modal",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    themeBg() {
      return this.isDarkMode ? 'dark' : 'light'
    },
    themeText() {
      return this.isDarkMode ? 'light' : 'dark'
    }
  },
  watch: {
    isDarkMode(val) {
      this.theme = val ? 'dark' : 'light'
      this.headerTextColor = val ? 'light' : 'dark'
    }
  },
  mounted() {
    if (!this.$cookies.isKey('shownInstructionModal')) {
      this.$cookies.set('shownInstructionModal', true)  // true if shown already
      this.showModal()
    }
  },
  methods: {
    showModal() {
      this.$refs['instructionModal'].show()
    },
  },
}
</script>

<style scoped>
</style>
