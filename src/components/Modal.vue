<template>
  <div :class="[{'text-white': isDarkMode}]">
  <b-modal title="Welcome to the new Shuttle Tracker!" :header-text-variant="textcolor" :footer-bg-variant="theme" :header-bg-variant="theme" :body-bg-variant="theme" ref="instructionModal" ok-only ok-title="Continue" >
  <!--b-modal title="Welcome to the new Shuttle Tracker!" :header-text-variant="textcolor" :footer-bg-variant="theme" :header-bg-variant="theme" :body-bg-variant="theme" ref="instructionModal" ok-only ok-title="Continue"-->
    <div :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> You're using the new Web interface for the <i> new </i> Shuttle Tracker. We've completely overhauled every component to bring superior accuracy. </div>
    <div class="my-2" :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> Green Buses indicates accurate location data while red buses show low quality location data</div>
    <div class="my-2" :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> If you use iPhone, then you can help out with crowd-sourced location data. Download our new beta app today! Click on "iOS App" link located on the bottom right hand corner of the map for more information.</div>
    <div :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> <i> Our Android app is comming soon!</i></div>
  </b-modal>
  </div>
</template>

<script>

import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  name: "Modal",
  data() {
    return{
      theme: '',
      textcolor: '',
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
  },
  mounted() {
   // if(!Vue.$cookies.isKey('shownInstructionModal')){
//      Vue.$cookies.set('shownInstructionModal', 'shownInstructionModalValue')
    //}
    this.showDarkMode()
    this.showModal()
  },
  methods: {
    showModal() {
      this.$refs['instructionModal'].show()
    },
    showDarkMode(){
      if(this.isDarkMode){
        this.theme='dark'
        this.textcolor='white'
      }
      else{
        this.theme='white'
        this.textcolor='dark'
      }
    }
  },
}
</script>

<style>
.modal-override{
    background: #0008;
}
.wtitle {
  color: white;
}
</style>