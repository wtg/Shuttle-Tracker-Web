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
            <h3>Location</h3>
            <p>
              Shuttle Tracker sends your location data to our server only when Board Bus is activated and stops sending these data when Board Bus is deactivated. You can activate Board Bus manually by tapping “Board Bus” or automatically by positioning your device within Bluetooth range of a Shuttle Tracker Node device on a bus if you opted in to the Shuttle Tracker Network. You can deactivate Board Bus manually by tapping “Leave Bus” or automatically by positioning your device out of Bluetooth range of a Shuttle Tracker Node device on a bus if you opted in to the Shuttle Tracker Network. Your location data are associated with an anonymous, random identifier that rotates every time you start a new shuttle trip. These data aren’t associated with your name, Apple ID, RCS ID, RIN, or any other information that might identify you or your device. We continuously purge location data that are more than 30 seconds old from our server. We may retain resolved location data that are calculated using a combination of system- and user-reported data indefinitely, but these resolved data don’t correspond with any specific user-reported coordinates. Even if you opt in to the Shuttle Tracker Network, we never track your location unless you manually activate Board Bus or physically board a bus. Your device might alert you to Shuttle Tracker’s location monitoring in the background even when Shuttle Tracker isn’t actually tracking your location. This is due to a system limitation; Shuttle Tracker occasionally scans for Shuttle Tracker Node devices in the  background, and your device might show that activity as location tracking. The results of these scans never leave your device, and we only start collecting location data if a scan indicates that you’re physically on a bus.
            </p>
            <h3>Logging</h3>
            <p>
              Shuttle Tracker automatically detects errors and uploads diagnostic logs to our server when they occur. These logs aren’t associated with your name, Apple ID, RCS ID, RIN, or any other information that might identify you or your device. They contain information about, for example, failed network requests. We redact sensitive information like your location, replacing those data with irreversible hashes. These hashes let us correlate different logs without revealing any of the redacted information. Logs are retained indefinitely; contact us if you want to request that we delete a log from our server. Due to the privacy-preserving nature of how we identify logs, we might not be able to find and to verify the log that you want to delete. You can see a record of recently uploaded logs or disable automatic uploads entirely in Settings > Logging & Analytics.
            </p>
            <h3>Analytics</h3>
            <p>
              If you opt in to analytics, then Shuttle Tracker will send anonymous usage data to our server. These data include your app settings, feature usage frequency, and other similar metrics. No analytics data are ever collected unless you explicitly opt in. You can see a record of recently uploaded analytics reports or opt-in status in Settings > Logging & Analytics.
            <p>
              Shuttle Tracker is developed as a partnership between the Web Technologies Group and the 
              <a href="https://new.rcos.io">Rensselaer Center for Open Source</a> at <a href="https://rpi.edu">
                Rensselaer Polytechnic Institute</a>. You can <a href="mailto:privacy@shuttletracker.app">contact our privacy team</a> with inquiries about this policy and the use of your data.
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

.custom-bullet {
  position: relative;
}

.custom-bullet::before {
  /* Image width and height can only be adjusted by its original file */ 
  content: url('../../public/map-marker.png'); 
  position: absolute;
  left: -40px;
  top: 2px;
}

<style scoped>

</style>
