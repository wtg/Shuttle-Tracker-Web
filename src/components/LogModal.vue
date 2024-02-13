<template>
  <b-modal centered
    title="Logs"
    :header-text-variant="themeText"
    :footer-bg-variant="themeBg"
    :header-bg-variant="themeBg"
    :body-bg-variant="themeBg"
    ref="logModal"
    @ok="hideModal"
    @hide="hideModal"
    ok-only
    ok-title="Exit"
  >
    <head>
      <link rel="stylesheet' href='css/bootstrap.min.css" />
    </head>
    <div :class="[{ 'text-white': isDarkMode }, { 'bg-dark': isDarkMode }]">
      <div v-for="uuid in uploadedLogs" :key="uuid">{{ uuid }}</div>
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
    isColorBlind() {
      return this.$store.state.isCbMode;
    },
    logModalVisible() {
      return this.$store.state.logModalVisible;
    },
    uploadedLogs() {
      return this.$store.state.logBuffer.uploads;
    },
    themeBg() {
      return this.isDarkMode ? "dark" : "light";
    },
    themeText() {
      return this.isDarkMode ? "light" : "dark";
    },
  },
  watch: {
    logModalVisible(isVisible) {
      if (isVisible) {
        this.showModal();
      }
    }
  },
  methods: {
    showModal() {
      this.$refs["logModal"].show();
    },
    hideModal() {
      this.$refs["logModal"].hide();
      this.$store.commit("showLogModal", false);
    },
  },
};
</script>
