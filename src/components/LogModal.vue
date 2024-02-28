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
      <!-- If there are pages, display a paginated table. -->
      <!-- If there are no pages, display a placeholder text instead of the table. -->
      <div v-if="logTablePages.length > 0">
        <table class="log-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>UUID</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in logTablePages[currentPage - 1]" :key="log.uuid">
              <!-- Format the date according to `dateFormat`. -->
              <td>{{ log.date.toLocaleString('en-US', dateFormat) }}</td>
              <!-- The uploaded log's UUID, returned by the server upon upload. -->
              <td>{{ log.uuid }}</td>
              <!-- 
                  The log's contents. Note that log.content is a string possibly containing newlines.
                  The `pre-wrap` style is to preserve those newlines.
              -->
              <td>
                <div style="white-space: pre-wrap;">{{ log.content }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="log-table-pagination">
          <b-pagination v-model="currentPage" :total-rows="uploadedLogs.length" :per-page="perPage" />
        </div>
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
  data() {
    return {
      // The formatting options for the date displayed in the log table.
      dateFormat: { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false },
      // The number of uploaded logs (rows) per page.
      perPage: 3,
      // The current page of the pagination (1-indexed).
      currentPage: 1,
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
    isColorBlind() {
      return this.$store.state.isCbMode;
    },
    themeBg() {
      return this.isDarkMode ? "dark" : "light";
    },
    themeText() {
      return this.isDarkMode ? "light" : "dark";
    },
    /// Check if the log modal is currently visible.
    logModalVisible() {
      return this.$store.state.logModalVisible;
    },
    /// The UUIDs of the logs that were uploaded.
    uploadedLogs() {
      return this.$store.state.logBuffer.uploads;
    },
    /// The pages of the log table. The number of rows per page are dictated by `perPage`.
    logTablePages() {
      const chunks = [];
      for (let i = 0; i < this.uploadedLogs.length; i += this.perPage) {
        chunks.push(this.uploadedLogs.slice(i, i + this.perPage));
      }
      return chunks;
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
/* Log table styles. */

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

/* Log table pagination styles. */

.log-table-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.log-table-pagination .page-item {
  display: inline-block;
  margin-right: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.log-table-pagination .page-link {
  padding: 6px 12px;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.log-table-pagination .page-link:hover { /* Make hovered page gray. */
  background-color: #f0f0f0;
}

.log-table-pagination .page-item.active .page-link { /* Make current page on pagination blue. */
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>