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
      <div class="row">
        <div class="col-md">
          <Schedule></Schedule>
        </div>
        <div class="col-md">
          <Settings></Settings>
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
    <Announcement class="position-fixed fixed-top"></Announcement>
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

export default {
  name: 'Home',
  components: {
    Tracker,
    Header,
    Schedule,
    Modal,
    ColorBlindIconModal,
    Settings,
    Copyright,
    Announcement
  }
}
</script>

<style scoped>
</style>
