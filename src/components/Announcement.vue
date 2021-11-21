<template>
  <div>
    <b-alert
        v-model="show"
        v-if="hasAnnouncements"
        :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode}]"
        class="position-fixed fixed-top m-0 rounded-0 p-0 py-2 border-0"
        style="z-index: 2000;">
      <div ref="ayyeeeee" class="scroll-left">
        <div class="position-absolute px-3" style="left: 0;top: 0;z-index: 2000;" :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode}]">📢:</div>
        <span class="scroll-text">
          <span v-for="a in announcements" :key="a.subject" class="mr-5">
            <span
                class="mr-2 px-2"
                :class="[{'announcement-dark': !isDarkMode}, {'announcement-light': isDarkMode}]">
              {{ a.subject }}</span>
            {{ a.body }}
          </span>
        </span>
      </div>
    </b-alert>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Announcement",
  data() {
    return {
      baseURL: process.env.VUE_APP_API_BASE_URL,
      raw: [],
      // raw: [
      //   {
      //     "end": "2022-11-21T03:33:05Z",
      //     "start": "2021-11-20T03:33:05Z",
      //     "id": "A1CB9E79-9511-48AC-B6A0-6F8B18D270FE",
      //     "signature": "G5iAgVD7AFTmF7IQ==",
      //     "subject": "Welcome (start and end)",
      //     "body": "Welcome to the new Shuttle Tracker!",
      //     "scheduleType": "startAndEnd"
      //   },
      //   {
      //     "end": "2021-11-21T03:33:05Z",
      //     "start": "2021-11-20T03:33:05Z",
      //     "id": "0DF1E83F-4F7F-4C95-B32C-62D639341ED5",
      //     "signature": "myxQ8H5eaEvI8a9JTTcetSG9muQ==",
      //     "subject": "Test (end only)",
      //     "body": "Testing testing 1...2...3...",
      //     "scheduleType": "endOnly"
      //   },
      //   {
      //     "end": "2021-11-21T03:33:05Z",
      //     "start": "2021-11-20T03:33:05Z",
      //     "id": "0DF1E83F-4F7F-4C95-B32C-62D639341ED5",
      //     "signature": "myxQ8H5eaEvI8a9JTTcetSG9muQ==",
      //     "subject": "NONE!!! (none)",
      //     "body": "Oh yea oh yea",
      //     "scheduleType": "none"
      //   },
      //   {
      //     "end": "2021-11-21T03:33:05Z",
      //     "start": "2021-11-20T03:33:05Z",
      //     "id": "0DF1E83F-4F7F-4C95-B32C-62D639341ED5",
      //     "signature": "myxQ8H5eaEvI8a9JTTcetSG9muQ==",
      //     "subject": "NONE!!! (startOnly)",
      //     "body": "Oh yea ohED5 0DF1E83F-4F7F-4C95-B32C-62D639341ED5 0DF1E83F-4F7F-4C95-B32C-62D639341ED5",
      //     "scheduleType": "startOnly"
      //   }
      // ],
      content: "HELLO there will be a schedule change",
      show: true
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
    }
  },
  methods: {
    async getAnnouncements() {
      //  Fetch raw data from the announcement API
      const res = await axios.get(this.baseURL + '/announcements')
      this.raw = res.data
    }
  },
  mounted() {
    this.getAnnouncements()
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
