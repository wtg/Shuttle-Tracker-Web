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
          <div class="col">
            <h2 class="text-white">Privacy Policy</h2>
            <div class="text-white" style="max-width: 600px;">
              Shuttle Tracker sends your location data to our server only when you tap “Board Bus”
              and stops sending these data when you tap “Leave Bus”. Your location data are
              associated with an anonymous, random identifier that rotates every time you start a
              new shuttle trip. These data aren’t associated with your name, email address, Apple ID,
              RCS ID, Google account, or any other identifying information. We continuously purge
              location data that are more than 30 seconds old from our server. We may retain
              resolved location data that are calculated using a combination of system- and
              user-reported data indefinitely, but these resolved data don’t correspond with any
              specific user-reported coordinates.
              <!-- Shuttle Tracker sends your location data to our server only when you tap “Board Bus”<br>
              and stops sending these data when you tap “Leave Bus”. Your location data are<br>
              associated with an anonymous, random identifier that rotates every time you start a<br>
              new shuttle trip. These data aren’t associated with your name, email address, Apple ID,<br>
              RCS ID, Google account, or any other identifying information. We continuously purge<br>
              location data that are more than 30 seconds old from our server. We may retain<br>
              resolved location data that are calculated using a combination of system- and<br>
              user-reported data indefinitely, but these resolved data don’t correspond with any<br>
              specific user-reported coordinates. -->
              </div>
            <b-button class="mt-3" to="/"> Home Page </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "PrivacyPolicy",
  components: {
    Header
  }
}
</script>

<style scoped>

</style>