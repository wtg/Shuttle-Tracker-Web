<template>
  <b-modal centered
    title="Logs"
    :header-text-variant="themeText"
    :footer-bg-variant="themeBg"
    :header-bg-variant="themeBg"
    :body-bg-variant="themeBg"
    size="lg"
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
      <div v-if="uploadedLogs.length > 0">
        <table class="log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>UUID</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in uploadedLogs" :key="log.uuid">
              <td>{{ log.date.toLocaleString('en-US', dateFormat) }}</td>
              <td>{{ log.uuid }}</td>
              <td>
                <div style="white-space: pre-wrap;">{{ log.content }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        No Recent Logs
      </div>
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
    /// Check if the log modal is currently visible.
    logModalVisible() {
      return this.$store.state.logModalVisible;
    },
    /// The UUIDs of the logs that were uploaded.
    uploadedLogs() {
      return this.$store.state.logBuffer.uploads;
    },
    themeBg() {
      return this.isDarkMode ? "dark" : "light";
    },
    themeText() {
      return this.isDarkMode ? "light" : "dark";
    },
    dateFormat() {
      return { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    },
    logModalTableFields() {
      return [
        { key: 'date', label: 'Date' },
        { key: 'uuid', label: 'UUID' },
        { key: 'content', label: 'Content' }
      ];
    },
  },
  watch: {
    /// Watcher for `logModalVisible` which toggles the log modal visiblity.
    logModalVisible(isVisible) {
      if (isVisible) {
        this.showModal();
      }
    }
  },
  methods: {
    /// Shows the modal. This assumes that $store's showLogModal value is true when invoked.
    showModal() {
      this.$refs["logModal"].show();
    },
    /// Hides the modal. Updates $store's showLogModal value to false.
    hideModal() {
      this.$refs["logModal"].hide();
      this.$store.commit("showLogModal", false);
    },
  },
};
</script>

<style>
.log-table {
  border-collapse: collapse;
  width: 100%;
}

.log-table th, .log-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.log-table th {
  text-align: left;
  background-color: #f2f2f2;
}
</style>