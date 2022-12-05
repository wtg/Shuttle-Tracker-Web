<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col" :class="{'text-white': isDarkMode}" style="max-width: 600px;">
            <h2>Privacy Policy</h2>
            <p>
              
            </p>
            <p>
              Shuttle Tracker is developed as a partnership between the Web Technologies Group and the <a href="https://rcos.io">Rensselaer Center for Open Source</a> at <a href="https://rpi.edu">Rensselaer Polytechnic Institute</a>. You can <a href="mailto:privacy@shuttletracker.app">contact our privacy team</a> with inquiries about this policy and the use of your data.
            </p>
            <b-button to="/"> Home Page </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import mixin from "../mixins/mixins";

export default {
  name: "PrivacyPolicy",
  mixins: [mixin],
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
