<template>
  <b-modal centered
      title="Welcome to the new Shuttle Tracker!"
      :header-text-variant="themeText"
      :footer-bg-variant="themeBg"
      :header-bg-variant="themeBg"
      :body-bg-variant="themeBg"
      ref="instructionModal"
      ok-only
      ok-title="Continue"
  >
    <div :class="[{ 'text-white': isDarkMode }, { 'bg-dark': isDarkMode }]">
      <p>
        You're using the new Web interface for the <i> new </i> Shuttle Tracker.
        We've completely overhauled every component to bring superior accuracy.
      </p>
      <div>
        <p class="d-flex align-items-center">
          <span class="icon-parent position-relative d-inline-block rounded-circle bg-success mr-3">
            <span class="position-absolute icon-text">🚍</span>
          </span>
          Indicates high-quality location data
        </p>
        <p class="d-flex align-items-center">
          <span class="icon-parent position-relative d-inline-block rounded-circle bg-danger mr-3">
            <span class="position-absolute icon-text">🚍</span>
          </span>
          Indicates low-quality location data
        </p>
      </div>
      <p>
        If you use iPhone, then you can help out with crowd-sourced location
        data. Download our new beta app today! Click on "iOS App" link located
        on the bottom right hand corner of the map for more information.
      </p>
      <p>If you use Android, then you can download our Android app! Click on "Android App"
        located on the bottom of the page.</p>
    </div>
  </b-modal>
</template>

<script>
/**
 * The instruction modal introduces new users to the basic functionality of the web app,
 * including what each bus icon represents, links to the ios and android app, and why 
 * the web interface was changed from the old interface. A new user is determined by 
 * the instructionModal cookie. If the cookie is found, the instruction modal will no longer appear when
 * a user enters the web app.
 */

export default {
  name: "Modal",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
    themeBg() {
      return this.isDarkMode ? "dark" : "light";
    },
    themeText() {
      return this.isDarkMode ? "light" : "dark";
    },
  },
  // Only show modal if there is no cookie data 
  mounted() {
    if (!this.$cookies.isKey("shownInstructionModal")) {
      this.$cookies.set("shownInstructionModal", true); // true if cookie is found, else false
      this.showModal();
    }
  },
  methods: {
    // Checks for the instructionModal cookie exists
    showModal() {
      this.$refs["instructionModal"].show();
    },
  },
};
</script>

<style scoped>
.icon-parent {
  padding: 1.2rem;
}
.icon-text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
