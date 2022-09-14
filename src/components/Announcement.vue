<template>
  <b-alert
      v-model="hasAnnouncements"
      :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode},
      {'fixed-top': !isFsMode}, {'position-fixed': !isFsMode}]"
      class="m-0 rounded-0 p-0 py-2 border-0"
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
import mixin from  '../mixins/mixins.js'

export default {
  name: "Announcement",
  mixins: [mixin],
  data() {
    return {
      updateOnNextInterval: false,
      fetchInterval: parseInt(process.env.VUE_APP_ANNOUNCEMENT_UPDATE_INTERVAL), // update announcement every minute
      announcerIndex: 0,
      rawUpdate: [],  // temporarily stores updated announcements
      raw: []
    }
  },
  computed: {
    baseURL() {
      return this.$store.state.baseURL
    },
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    devAnnouncement() {
      return this.$store.state.fakeAnnounce;
    },
    announcements() {
      // filter out unwanted announcements
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
  watch: {
    // simulates the announcement bar
    devAnnouncement() {
      this.getAnnouncements();
    },
    baseURL() {
      this.getAnnouncements();
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
      // Fetch raw data from the announcement API
      const res = await axios.get(this.baseURL + '/announcements');
      /* FOR DEBUGGING >>*/ //const res = await axios.get('https://staging.shuttletracker.app/announcements');
      this.raw = res.data;
      // Simulate announcement bar
      if(this.devAnnouncement) {
        // Input fake announcement
        this.announcements[0] = {subject: "Debug", body: "This is a fake announcement."};
      }

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

  beforeMount()
  {
    var i = document.querySelector(".scroll-left .scroll-text");
    // attempt to get ".scroll-left .scroll-text" every 500ms until not null
    let check = function() {
      setTimeout(function () {
        if(i === null)
        {
          i = document.querySelector(".scroll-left .scroll-text");
          check();
        }
        else {
          // handles mouse down and touch down
          let pauseAnim = () => {
            if(i) {
              i.style.setProperty("--animState", "paused");
            }
          }
          // add event listeners for pausing the animation
          "mousedown touchstart".split(" ").forEach(function(e){document.addEventListener(e, pauseAnim, false)});
          // handles mouse up and touch release
          let resumeAnim = () => {
            if(i) {
              i.style.setProperty("--animState", "running");
            }
          }
          // add event listeners for resuming the animation
          "mouseup touchend".split(" ").forEach(function(e){document.addEventListener(e, resumeAnim, false)});
        }
      }, 500);
    };
    check();
  },

  mounted() {
    this.getAnnouncements();
    this.updateAnnouncements();
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

  /* Animation Variables */
  --defaultSpeed: 25s;
  --animState: running;

  /* Apply animation to this element */
  -moz-animation: scroll-left var(--defaultSpeed) linear infinite;
  -webkit-animation: scroll-left var(--defaultSpeed) linear infinite;
  animation: scroll-left var(--defaultSpeed) linear infinite;
  animation-play-state: var(--animState);
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
