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
            <h3> Location</h3>
            <p>
              Shuttle Tracker sends your location data to our server only when you tap “Board Bus” and stops sending these data when you tap “Leave Bus”. Your location data are associated with an anonymous, random identifier that rotates every time you start a new shuttle trip. These data aren’t associated with your name, Apple ID, RCS ID, RIN, or any other information that might identify you or your device. We continuously purge location data that are more than 30 seconds old from our server. We may retain resolved location data that are calculated using a combination of system- and user-reported data indefinitely, but these resolved data don’t correspond with any specific user-reported coordinates.
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
