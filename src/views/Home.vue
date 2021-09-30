<template>
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
    <div class="row mt-3">
      <div class="col">
        <Status></Status>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col">
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Tracker from "../components/Tracker";
import Header from "../components/Header"
import Footer from "../components/Footer";
import Status from "../components/Status";

export default {
  name: 'Home',
  components: {
    Tracker,
    Header,
    Footer,
    Status
  }
}
</script>
