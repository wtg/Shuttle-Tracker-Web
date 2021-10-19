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
        You're using the new Web interface for the <i> new </i> Shuttle Tracker.
        We've completely overhauled every component to bring superior accuracy.
      </p>
      <div>
        <p>
          <span class="rounded-circle bg-success mr-3 p-2 h5 d-inline-block"
            >🚍</span
          >
          Indicates high-quality location data
        </p>
        <p>
          <span class="rounded-circle bg-danger mr-3 p-2 h5 d-inline-block"
            >🚍</span
          >
          Indicates low-quality location data
        </p>
      </div>
      <p>
        If you use iPhone, then you can help out with crowd-sourced location
        data. Download our new beta app today! Click on "iOS App" link located
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
  mounted() {
    if (!this.$cookies.isKey("shownInstructionModal")) {
      this.$cookies.set("shownInstructionModal", true); // true if shown already
      this.showModal();
    }
    if (!this.$cookies.isKey("shownColorBlindModal")) {
      this.$cookies.set("shownColorBlindModal", true); // true if shown already
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
.icon-round {
  width: 40px !important;
  height: 40px !important;
}
</style>
