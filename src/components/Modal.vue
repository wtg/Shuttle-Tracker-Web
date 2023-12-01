<template>
  <b-modal centered
      :title="modalTitle"
      :header-text-variant="themeText"
      :footer-bg-variant="themeBg"
      :header-bg-variant="themeBg"
      :body-bg-variant="themeBg"
      ref="instructionModal"
      ok-only
      ok-title="Continue"
  >
    <div v-if="announcementModal" class="body" :class="[{ 'text-white': isDarkMode }, { 'bg-dark': isDarkMode }]">
      <p v-if="announcementLen === 0">
        We currently do not have an announcement. Stay tuned!
      </p>
      <ul v-if="announcementLen > 0" :class="{'text-white': isDarkMode}">
        <li v-for="(announcement, index) in $store.state.allAnnouncements" :key="index">
          <span v-if="announcement.subject == ''">
            {{ announcement.body }}
          </span>
          <span v-if="announcement.subject != ''">
            {{ announcement.subject }}: {{ announcement.body }}
          </span>
        </li>
      </ul>
      <p>
        If you use iPhone, then you can help out with crowd-sourced location
        data. Download our new beta app here! 
        <b-link :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              href="https://shuttletracker.app/swiftui/"
              target="_blank">
          iOS/iPadOS/macOS App
        </b-link>
      </p>
      <p>
        If you use Android, then you can download our Android app!
        <b-link :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              href="https://shuttletracker.app/android/"
              target="_blank">
        Android App
        </b-link>
      </p>
      <p>
        Help with the development of Shuttle Tracker if interested!
        <b-link :class="[{'text-black': !isDarkMode}, {'text-gray': isDarkMode}]"
              href="https://shuttletracker.app/android/"
              target="_blank">
          Shuttle Tracker
          <b-icon-github class="mb-1" font-scale="1.25"></b-icon-github>
          An RCOS project
          </b-link>
      </p>
    </div>
    <div v-if="instructionModal" class="body" :class="[{ 'text-white': isDarkMode }, { 'bg-dark': isDarkMode }]">
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
import {BIconGithub} from 'bootstrap-vue'

export default {
  name: "Modal",
  components: {
    BIconGithub
  },
  data() {
    return {
      instructionModal: true,
      announcementModal: false,
      announcementLen: 0,
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
    // Adjust modal title
    modalTitle() {
      if (this.instructionModal) {
        return "Welcome to the new Shuttle Tracker!";
      } else if (this.announcementModal) {
        return "Announcements";
      } else {
        // will not appear unless logic is flawed
        return "No Content";
      }
    }
  },
  mounted() {
    // Show modal if there is no cookie data 
    if (!this.$cookies.isKey("shownInstructionModal") || this.instructionModal) {
      this.$cookies.set("shownInstructionModal", true); // true if shown already
      this.instructionModal = false;
      this.announcementModal = true;
    }
    this.checkAnnouncementLen();
  },
  methods: {
    showModal() {
      this.$refs["instructionModal"].show();
    },
    checkAnnouncementLen() {
      this.announcementLen = this.$store.state.allAnnouncements.length;
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
.body {
  min-height: 15em;
}
.icon-parent {
  padding: 1.2rem;
}
.icon-text {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
