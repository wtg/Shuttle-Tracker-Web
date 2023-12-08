<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <Tracker></Tracker>
        </div>
      </div>
      <div class="row" :class="[{'progressbar' : progressBar}, {'progressbarDisabled' : !progressBar}]">
        <div class="col">
          <Progressbar></Progressbar>
        </div>
      </div>
      <div v-if="!isFsMode" class="row">
        <div class="col-md mt-3">
          <Schedule></Schedule>
        </div>
        <div class="col-md mt-3">
          <Settings></Settings>
        </div>
        <div v-if="isAdvMode" class="col-md">
          <AdvanceSettings></AdvanceSettings>
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
    Progressbar
  },
  computed: {
    isAdvMode() {
      return this.$store.state.isAdvMode
    },
    progressBar() {
      return this.$store.state.progressBar;
    }
  }
}
</script>

<style scoped>
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
