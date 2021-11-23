<template>
  <b-alert
      v-model="hasAnnouncements"
      :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode}]"
      class="position-fixed fixed-top m-0 rounded-0 p-0 py-2 border-0"
      style="z-index: 2000;">
    <div ref="announcer" class="scroll-left">
      <div class="position-absolute px-3" style="left: 0;top: 0;z-index: 2000;"
           :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode}]">📢:
      </div>
      <span class="scroll-text">
        <span
            class="mr-2 px-2"
            :class="[{'announcement-dark': !isDarkMode}, {'announcement-light': isDarkMode}]">
            {{ focusedAnnouncement.subject }}</span>
          {{ focusedAnnouncement.body }}
      </span>
    </div>
  </b-alert>
</template>

<script>
import axios from "axios";

export default {
  name: "Announcement",
  data() {
    return {
      updateOnNextInterval: false,
      fetchInterval: parseInt(process.env.VUE_APP_ANNOUNCEMENT_UPDATE_INTERVAL), // update announcement every minute
      announcerIndex: 0,
      baseURL: process.env.VUE_APP_API_BASE_URL,
      rawUpdate: [],  // temporarily stores updated announcements
      raw: []
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    announcements() {
      //  filter out unwanted announcements
      return this.raw.filter((announce) => {
        if (announce.scheduleType === "startAndEnd") {
          return Date.now() >= Date.parse(announce.start) && Date.now() < Date.parse(announce.end)
        } else if (announce.scheduleType === "startOnly") {
          return Date.now() >= Date.parse(announce.start)
        } else if (announce.scheduleType === "endOnly") {
          return Date.now() < Date.parse(announce.end)
        } else return announce.scheduleType === "none"
      })
    },
    hasAnnouncements() {
      return this.announcements.length > 0
    },
    focusedAnnouncement() {
      // announcement on display
      if (this.hasAnnouncements) {
        return this.announcements[this.announcerIndex]
      } else {
        return {subject: '', body: ''}
      }
    }
  },
  methods: {
    async updateAnnouncements() {
      const vm = this
      setInterval(async () => {
        //  Fetch raw data from the announcement API
        const res = await axios.get(vm.baseURL + '/announcements')
        vm.rawUpdate = res.data
        // compare updates
        const rawIds = vm.raw.map(x => x.id)
        const updateIds = vm.rawUpdate.map(x => x.id)
        rawIds.sort()
        updateIds.sort()
        if (rawIds.length === updateIds.length && rawIds.every((v,i) => v === updateIds[i])) {
          // nothing updated, wait for another cycle
          return
        }
        // something is updated
        vm.updateOnNextInterval = true
      }, this.fetchInterval)
    },
    async getAnnouncements() {
      //  Fetch raw data from the announcement API
      const res = await axios.get(this.baseURL + '/announcements')
      this.raw = res.data
      if (this.hasAnnouncements) {
        this.$nextTick(this.loadAnnouncer)
      }
    },
    loadAnnouncer() {
      //  Load different announcement for every animation loop
      this.$refs.announcer.addEventListener('animationiteration', () => {
        if (this.updateOnNextInterval) {
          // update announcement
          this.raw = this.rawUpdate
          this.rawUpdate.clear()
          this.updateOnNextInterval = false
        }
        // cycle displayed announcement
        this.announcerIndex++
        if (this.announcerIndex >= this.announcements.length) {
          this.announcerIndex = 0
        }
      });
    }
  },
  mounted() {
    this.getAnnouncements()
    this.updateAnnouncements()
  }
}
</script>

<style scoped>
.announcement-dark {
  background-color: #121212;
  border-color: #121212;
  color: white;
}

.announcement-light {
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  color: black;
}

.scroll-left {
  white-space: nowrap;
  position: relative;
  height: 1.5em;
}

.scroll-left .scroll-text {
  position: absolute;
  min-width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  /* Starting position */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  /* Apply animation to this element */
  -moz-animation: scroll-left 15s linear infinite;
  -webkit-animation: scroll-left 15s linear infinite;
  animation: scroll-left 15s linear infinite;
}

/* Move it (define the animation) */
@-moz-keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
  }
}

@-webkit-keyframes scroll-left {
  0% {
    -webkit-transform: translateX(100%);
  }
  100% {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes scroll-left {
  0% {
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%);
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}
</style>
