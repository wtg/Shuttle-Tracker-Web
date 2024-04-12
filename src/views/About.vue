<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col" style="display: flex; justify-content: space-between; align-items: center;">
          <Header></Header>
          <div style="display: flex; align-items: center;">
            <a href="https://shuttletracker.app" style="margin-right: 10px;">
              <b-icon-house-fill class="mb-1" font-scale="1.25" :style="{ color: isDarkMode ? 'white' : 'black' }" />
            </a>
            <div style="margin-right: 10px;">
              <b-icon-sun v-if="isDarkMode" @click="toLightMode" color="white" class="mb-1" font-scale="1.25" />
              <b-icon-moon v-else @click="toDarkMode" class="mb-1" font-scale="1.25" />
            </div>
            <a href="https://github.com/wtg/Shuttle-Tracker-Web/tree/main">
              <b-icon-github class="mb-1" font-scale="1.25" :style="{ color: isDarkMode ? 'white' : 'black' }" />
            </a>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div style="width: 40%; margin-left: 20px; margin-right: 20px;">
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
        </div>
        <div style="width: 60%; margin-left: 20px; margin-right: 20px;">
          <Tracker only_map=true />
        </div>
      </div>
      <div class="row">
        <div class="col" :class="{'text-white': isDarkMode}" style="max-width: 1140px;">
          <h2>About</h2>
          <p> 
            Welcome to Shuttle Tracker, your go-to destination for 
            real-time RPI shuttle tracking and navigation. Our platform 
            is designed to make your journey around campus simpler.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import {BIconGithub, BIconHouseFill, BIconSun, BIconMoon} from 'bootstrap-vue'
import mixin from "../mixins/mixins";
import Tracker from "../components/Tracker";

export default {
  name: "About",
  mixins: [mixin],
  components: {
    Header,
    BIconGithub,
    BIconHouseFill,
    BIconSun,
    BIconMoon,
    Tracker
  },
  methods: {
    toLightMode() {
      this.$store.commit('setDarkMode', false);
    },
    toDarkMode() {
      this.$store.commit('setDarkMode', true);
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>