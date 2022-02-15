<template>
  <b-card
    class="mt-3"
    :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]"
  >
    <h3 :class="{ 'text-white': isDarkMode }">Get The Mobile App!</h3>
    <div class="box">
      <p :class="{ 'text-white': isDarkMode }">IOS</p>
      <div>
        <img src="../../public/app_clip_shuttle.png" alt="ios qr code" />
      </div>
    </div>
    <div class="box">
      <p :class="{ 'text-white': isDarkMode }">Android</p>
      <div>
        <img src="" alt="android qr code" />
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "Fullscrn_qrcode",
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
  },
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
  background-color: rgb(235, 235, 235, 0.75);
  border-color: rgba(235, 235, 235, 0.75);
}

.bubble-dark {
  background-color: rgb(71, 71, 71, 0.8);
  border-color: rgb(71, 71, 71, 0.8);
}
</style>
