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
        <div class="col">
          <Footer></Footer>
        </div>
      </div>
      <div class="row mt-3">
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
  </div>
</template>

<script>
// @ is an alias to /src
import Tracker from "../components/Tracker";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Schedule from "../components/Schedule";
import Modal from "../components/Modal";
import Settings from "../components/Settings";
import Copyright from "../components/Copyright";

export default {
  name: 'Home',
  components: {
    Tracker,
    Header,
    Footer,
    Schedule,
    Modal,
    Settings,
    Copyright
  }
}
</script>

<style scoped>
</style>
