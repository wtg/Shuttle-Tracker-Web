<template>
  <b-modal title="Welcome to the new Shuttle Tracker!" :header-text-variant="headerTextColor" :footer-bg-variant="theme" :header-bg-variant="theme" :body-bg-variant="theme" ref="instructionModal" ok-only ok-title="Continue" >
    <div :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> You're using the new Web interface for the <i> new </i> Shuttle Tracker. We've completely overhauled every component to bring superior accuracy. </div>
    <div class="my-2" :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> Green Buses indicates accurate location data while red buses show low quality location data. When Color-Blind Mode is toggled, a scope icon will indicate high-quality location data.</div>
    <div class="my-2" :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> If you use iPhone, then you can help out with crowd-sourced location data. Download our new beta app today! Click on "iOS App" link located on the bottom right hand corner of the map for more information.</div>
    <div :class="[{'text-white': isDarkMode}, {'bg-dark':isDarkMode}]"> <i> Our Android app is comming soon!</i></div>
  </b-modal>
</template>

<script>

export default {
  name: "Modal",
  data() {
    return{
      theme: '',
      headerTextColor: '',
      output:''
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
  },
  watch: {
    isDarkMode(val){
      console.log(val)
      this.theme = val ? 'dark' : 'white'
      this.headerTextColor = val ? 'white' : 'dark'
    }
  },
  mounted() {
    if(!this.$cookies.isKey('shownInstructionModal')){
      this.$cookies.set('shownInstructionModal', 'shownInstructionModalValue')
      this.showModal()
    }
  },
  methods: {
    showModal() {
      this.$refs['instructionModal'].show()
    },
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
