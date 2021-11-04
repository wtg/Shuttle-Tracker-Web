<template>
  <b-modal
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
        You're using the new Web interface for Shuttle Tracker bringing superior accuracy.
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
        You can now contribute crowd-sourced location data to improve bus location accuracy with
        our iOS app. Download our new beta app today! Click on "iOS App" link located
        on the bottom right hand corner of the map for more information.
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
      this.$cookies.set("shownInstructionModal", true); // true if shown already
      this.showModal();
    }
  },
  methods: {
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
