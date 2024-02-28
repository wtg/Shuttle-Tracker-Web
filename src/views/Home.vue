<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div class="row mt-2 tracker">
        <div class="col">
          <Tracker></Tracker>
        </div>
      </div>
      <div class="row" :class="[{'progressbar' : progressBar}, {'progressbarDisabled' : !progressBar}]">
        <div class="col">
          <Progressbar></Progressbar>
        </div>
      </div>
      <div v-if="!isFsMode" class="flexbox row">
        <div class="flex col-md mt-3" :class="{ 'other': isDevMode }">
          <Schedule></Schedule>
        </div>
        <div class="flex col-md mt-3" :class="{ 'other': isDevMode }">
          <Settings></Settings>
        </div>
        <div :class="[{'flex col-md adv-mode-on' : isAdvMode}, {'adv-mode-off' : !isAdvMode}]">
          <AdvanceSettings class="advance-settings"></AdvanceSettings>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <Copyright></Copyright>
        </div>
      </div>
    </div>
    <Modal></Modal>
    <ColorBlindIconModal></ColorBlindIconModal>
    <LogModal></LogModal>
    <Announcement></Announcement>
  </div>
</template>

<script>
// @ is an alias to /src
import Tracker from "../components/Tracker";
import Header from "../components/Header"
import Schedule from "../components/Schedule";
import Modal from "../components/Modal";
import ColorBlindIconModal from "../components/ColorBlindIconModal";
import Settings from "../components/Settings";
import Copyright from "../components/Copyright";
import Announcement from "../components/Announcement";
import AdvanceSettings from "../components/AdvanceSettings";
import mixin from "../mixins/mixins";
import Progressbar from "../components/Progressbar";
import LogModal from "../components/LogModal";

export default {
  name: 'Home',
  mixins: [mixin],
  components: {
    Tracker,
    Header,
    Schedule,
    Modal,
    ColorBlindIconModal,
    Settings,
    Copyright,
    Announcement,
    AdvanceSettings,
    Progressbar,
    LogModal
},
  computed: {
    isAdvMode() {
      return this.$store.state.isAdvMode
    },
    isDevMode() {
      return this.$store.state.devMode;
    },
    progressBar() {
      return this.$store.state.progressBar;
    }
  },
  methods: {
    // Timeout when Advance Mode is activated
    onTimeout() {
      this.activateTimeout = setTimeout(() => this.activateAdvanceModePanel(), 500);
    },
    // Display Advance Settings
    activateAdvanceModePanel() {
      let adv = document.querySelector(".advance-settings");
      adv.style.display = "block";
    },
    // Timeout when Advance Mode is deactivated
    offTimeout() {
      this.deactivateTimeout = setTimeout(() => this.deactivateAdvanceModePanel(), 200);
    },
    // Hide Advance Settings
    deactivateAdvanceModePanel() {
      let adv = document.querySelector(".advance-settings");
      adv.style.display = "none";
    },
    clearTimeouts() {
      if (this.activateTimeout) {
        clearTimeout(this.activateTimeout);
      }

      if (this.deactivateTimeout) {
        clearTimeout(this.deactivateTimeout);
      }
    },
  },
  beforeDestroy() {
    this.clearTimeouts();
  },
  beforeRouteEnter(to, from, next) {
    const hasRefreshed = localStorage.getItem('hasRefreshed');

    if (!hasRefreshed) {
      next(vm => {
        vm.$nextTick(() => {
          // set the flag to indicate that the refresh has occurred for testing
          localStorage.setItem('hasRefreshed', true);

        });

      });
    } else {
      next();

    }
  },
  watch: {
    isAdvMode(newVal) {
      if (newVal == true) {
        this.onTimeout();
      }
      if (newVal == false) {
        this.offTimeout();
      }
    },
  },
}



</script>
<style scoped>
.other {
  width: 100%;
  max-height: 1000px;
  transition: all 1s linear;
}
.advance-settings {
  display: none;
}
.flexbox {
  max-height: 500px;
  display: flex;
  flex-direction: row; 
  overflow: hidden;
}
.flex{
  flex: 1;
  transition: all 1s linear;
}
/* Animation class for Advanced Settings */
.adv-mode-on {
  flex: 0.00001;
  animation: slideFromRight 1s ease forwards;
  -webkit-animation: slideFromRight 1s ease forwards;
  -o-animation: slideFromRight 1s ease forwards;
}
.adv-mode-off {
  flex: 1;
  animation: slideBack 1s ease forwards;
  -webkit-animation: slideBack 1s ease forwards;
  -o-animation: slideBack 1s ease forwards;
}
@keyframes slideFromRight {
  from {
    transform: translateY(150%);
    transform: translateX(300%);
    scale: 0%;
  }
  50% {
    flex: 1;
  }
  to {
    transform: translateY(0%);
    transform: translateX(0%);
    flex: 1;
    scale: 100%;
  }
}

@-webkit-keyframes slideFromRight {
  from {
    transform: translateY(150%);
    transform: translateX(300%);
    scale: 0%;
  }
  50% {
    flex: 1;
  }
  to {
    transform: translateY(0%);
    transform: translateX(0%);
    flex: 1;
    scale: 100%;
  }
}

@-o-keyframes slideFromRight {
  from {
    transform: translateY(150%);
    transform: translateX(300%);
    scale: 0%;
  }
  50% {
    flex: 1;
  }
  to {
    transform: translateY(0%);
    transform: translateX(0%);
    flex: 1;
    scale: 100%;
  }
}

@keyframes slideBack {
  from {
    transform: translateX(0%);
    flex: 1;
  }
  to {
    transform: translateX(300%);
    flex: 0.00001;
  }
}

@-webkit-keyframes slideBack {
  from {
    transform: translateX(0%);
    flex: 1;
  }
  to {
    transform: translateX(300%);
    flex: 0.00001;
  }
}

@-o-keyframes slideBack {
  from {
    transform: translateX(0%);
    flex: 1;
  }
  to {
    transform: translateX(300%);
    flex: 0.00001;
  }
}
.progressbar {
  position:relative;
  z-index: -1;
  transform: translateY(-200%);
  animation: slideDown 1s ease forwards;
  -webkit-animation: slideDown 1s ease forwards;
  -o-animation: slideDown 1s ease forwards;
}
.progressbarDisabled {
  position: relative;
  z-index: -1;
  margin: -10px;
  animation: slideUp 1s ease forwards;
  -webkit-animation: slideUp 1s ease forwards;
  -o-animation: slideUp 1s ease forwards;
}
.tracker {
  z-index: 1;
}
@keyframes slideDown {
  from {
    margin: -10px;
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    margin: 5px;
    transform: translateY(0%);
    opacity: 1;  
    margin-bottom: -5px;
  }
}

@-webkit-keyframes slideDown {
  from {
    margin: -10px;
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    margin: 5px;
    transform: translateY(0%);
    opacity: 1;  
    margin-bottom: -5px;
  }
}

@-o-keyframes slideDown {
  from {
    margin: -10px;
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    margin: 5px;
    transform: translateY(0%);
    opacity: 1;  
    margin-bottom: -5px;
  }
}

@keyframes slideUp {
  0% {
    transform: translateY(0%);
    opacity: 1;
    margin: 0px;
  }
  99% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(-100%);
    display: none;
  }
}

@-webkit-keyframes slideUp {
  0% {
    transform: translateY(0%);
    opacity: 1;
    margin: 0px;
  }
  99% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(-100%);
    display: none;
  }
}

@-o-keyframes slideUp {
  0% {
    transform: translateY(0%);
    opacity: 1;
    margin: 0px;
  }
  99% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(-100%);
    display: none;
  }
}
</style>
