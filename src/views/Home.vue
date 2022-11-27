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
    AdvanceSettings
  },
  computed: {
    isAdvMode() {
      return this.$store.state.isAdvMode
    }
  }
}
</script>

<style scoped>
</style>
