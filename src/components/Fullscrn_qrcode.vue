<template>
  <b-card v-if="isFsMode && showQR" class="h-100"
          :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]">
    <h3 :class="{ 'text-white': isDarkMode }">
      Get The Mobile App!
    </h3>
    <div class="text-center">
      <div :class="{ 'text-white': isDarkMode }">iOS</div>
      <img src="../../public/App_Clip_Code.svg" alt="ios qr code" class="qr-code"/>
      <div :class="{ 'text-white': isDarkMode }">Android</div>
      <img src="../../public/Android_qr.svg" alt="android qr code" class="qr-code"/>
    </div>
  </b-card>
</template>

<script>
import mixin from '../mixins/mixins.js'

export default {
  name: "Fullscrn_qrcode",
  mixins: [mixin],
  data() {
    return {
      showQR: false
    }
  },
  watch: {
    '$store.state.showIcons': function () {
      this.showQR = this.$store.state.showIcons;
    }
  }
};
</script>

<style scoped>

.qr-code {
  width: 70%;
}

.flex-even {
  flex: 1;
}

.bubble-light {
  background-color: rgba(235, 235, 235, 0.75);
  border-color: rgba(235, 235, 235, 0.75);
}

.bubble-dark {
  background-color: rgba(71, 71, 71, 0.8);
  border-color: rgba(71, 71, 71, 0.8);
}
</style>
