<template>
  <b-card v-if="isFsMode"
    class="mt-3"
    :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]"
  >
    <h3 :class="{ 'text-white': isDarkMode }">Get the Mobile App!</h3>
    <div class="box">
      <p :class="{ 'text-white': isDarkMode }">iOS</p>
      <div>
        <img src="../../public/App_Clip_Code.svg" alt="ios qr code" />
      </div>
    </div>
    <div class="box">
      <p :class="{ 'text-white': isDarkMode }">Android</p>
      <div>
        <img src="../../public/Android_qr.svg" alt="android qr code" />
      </div>
    </div>
  </b-card>
</template>

<script>
import mixin from '../mixins/mixins.js'

export default {
  name: "Fullscrn_qrcode",
  mixins: [mixin]
};
</script>

<style scoped>
h3 {
  font-size: 22px;
}
p {
  margin-bottom: 0px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
span {
  float: right;
}
img {
  width: 65%;
  margin-bottom: 10px;
}
.card {
  border-radius: 7px;
}

.card-body {
  padding: 0.5rem;
}
.box {
  text-align: center;
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
