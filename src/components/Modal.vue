<template>
  <div :class="[{'text-white': isDarkMode}]">
    <b-modal ref="instructionModal" ok-only ok-title="Continue" title="Welcome to the new Shuttle Tracker!">
      <div> You're using the new Web interface for the <i> new </i> Shuttle Tracker. We've completely overhauled every component to bring superior accuracy. </div>
      <div class="my-2"> Green Buses indicates accurate location data while red buses show low quality location data</div>
      <div class="my-2"> If you use iPhone, then you can help out with crowd-sourced location data. Download our new beta app today! Click on "iOS App" link located on the bottom right hand corner of the map for more information.</div>
      <div> <i> Our Android app is comming soon!</i></div>
    </b-modal>
  </div>
</template>

<script>

import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

export default {
  name: "Modal",
  mounted(){
    if(!Vue.$cookies.isKey('shownInstructionModal')){
      this.showModal()
      Vue.$cookies.set('shownInstructionModal', 'shownInstructionModalValue')
    }
  },
  methods: {
    showModal() {
      this.$refs['instructionModal'].show()
    },
    hideModal() {
      this.$refs['instructionModal'].hide()
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
}
</script>

<style scoped>

</style>