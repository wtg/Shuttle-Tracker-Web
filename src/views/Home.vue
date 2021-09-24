<template>
  <div class="container">
    <div class="col">
      <div class="row">
        <Header></Header>
      </div>
    </div>
    <div class="col">
      <div class="row">
        <Tracker></Tracker>
      </div>
    </div>
    <div class="col">
      <div class="row">
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

export default {
  name: 'Home',
  components: {
    Tracker,
    Header,
    Footer
  }
}
</script>
