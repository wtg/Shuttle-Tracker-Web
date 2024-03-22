<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div style="margin-top: 15vh;" :class="{'text-white': isDarkMode}">
        <h1>Simplify Your <span style="color: red;">RPI</span></h1>
        <h1>Campus Commute</h1>
      </div>  
      <div style="width: 100%;">
        <div style="width:150px; display:inline-block">
          <a href="https://shuttletracker.app/swiftui/">
            <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1636675200" alt="Download on the App Store" style="margin:6%;width:88%"/>
          </a>
        </div>
        <div style="width:167px; display:inline-block;">
          <a href="https://shuttletracker.app/android/">
            <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play"/>
          </a>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col" :class="{'text-white': isDarkMode}" style="max-width: 1140px; margin-top: 15vh;">
            <h2>About</h2>
            <p> 
                Welcome to Shuttle Tracker, your go-to destination for 
                real-time RPI shuttle tracking and navigation. Our platform 
                is designed to make your journey around campus simpler.
            </p>
            <b-button to="/" style="margin-top: 3%;"> Home Page </b-button>
          </div>
        </div>
        <div class="col mt-4" :class="text-white" style="margin-top: 5%;">
          <Copyright></Copyright>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import mixin from "../mixins/mixins";

export default {
  name: "About",
  mixins: [mixin],
  components: {
    Header
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>