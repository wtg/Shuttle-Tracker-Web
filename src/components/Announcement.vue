<template>
  <div>
    <b-alert
        v-model="show"
        :class="[{'announcement-dark': isDarkMode}, {'announcement-light': !isDarkMode}]"
        class="position-fixed fixed-top m-0 rounded-0 p-0 py-2"
        style="z-index: 2000;">
      <div class="container">
        <div class="d-flex">
          <div class="d-flex mr-2">📢:</div>
          <div class="d-flex flex-grow-1 scroll-left">
            <span class="scroll-text">{{ content }}</span>
          </div>
        </div>
      </div>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      content: "HELLO there will be a schedule change",
      show: true
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
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
  overflow: hidden;
  position: relative;
  height: 1.5em;
}

.scroll-left .scroll-text {
  position: absolute;
  width: 100%;
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
    -moz-transform: translateX(100%); /* Browser bug fix */
    -webkit-transform: translateX(100%); /* Browser bug fix */
    transform: translateX(100%);
  }
  100% {
    -moz-transform: translateX(-100%); /* Browser bug fix */
    -webkit-transform: translateX(-100%); /* Browser bug fix */
    transform: translateX(-100%);
  }
}
</style>
