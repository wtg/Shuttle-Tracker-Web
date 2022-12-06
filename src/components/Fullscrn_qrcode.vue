<template>
  <b-card v-if="isFsMode && showQR" class="h-100"
          :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]">
    <h3 :class="{ 'text-white': isDarkMode }">
      Get The Mobile App!
    </h3>
    <div class="text-center qr-codes">
      <div v-if="qr_id === 0">
        <div :class="{ 'text-white': isDarkMode }">iOS</div>
        <img src="../../public/App_Clip_Code.svg" alt="ios qr code" class="qr-code"/>
      </div>
      <div v-else>
        <div :class="{ 'text-white': isDarkMode }">Android</div>
        <img src="../../public/Android_Clip_Code.png" alt="android qr code" class="qr-code"/>
      </div>
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
      showQR: false,
      swap_interval: 5000, // interval at which the QR codes are swapped (milliseconds)
      qr_id: 0
    }
  },
  watch: {
    '$store.state.showIcons': function () {
      this.showQR = this.$store.state.showIcons;
    }
  },
  mounted() {
    // Swap QR-codes
    setInterval(() => {
      if (this.qr_id === 0) {
        this.qr_id = 1
      } else {
        this.qr_id = 0
      }
    }, this.swap_interval)
  }
};
</script>

<style scoped>

.qr-code {
  width: 15rem;
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
