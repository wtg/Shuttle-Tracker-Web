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

export default {
  name: "Modal",
  data() {
    return {
      instructionModal: True,
      announcementModal: false,
    };
  },
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
  mounted() {
    // Show modal if there is no cookie data 
    if (!this.$cookies.isKey("shownInstructionModal") && this.instructionModal) {
      this.$cookies.set("shownInstructionModal", true); // true if shown already
      this.instructionModal = !this.instructionModal;
    }
  },
  methods: {
    showModal() {
      this.$refs["instructionModal"].show();
    },
  },
  watch: {
    '$store.state.isAnnouncementClicked'(newVal) {
      if (newVal) {
        this.$store.commit('setAnnouncementClicked', false); // Reset the state
        this.showModal();
      }
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
