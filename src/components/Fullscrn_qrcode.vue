<template>
  <b-card
    class="mt-3"
    :class="[{ 'bubble-dark': isDarkMode }, { 'bubble-light': !isDarkMode }]"
  >
    <h3 :class="{ 'text-white': isDarkMode }">
      Get our mobile app!
    </h3>

    <div>
        <p :class="{ 'text-white': isDarkMode }">
            IOS APP <span :class="{ 'text-white': isDarkMode }"> Andriod APP  </span>
        </p>
        <div>
            <img src="../../public/app_clip_shuttle.png" alt="ios qr code">
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
  font-size: 30px;
}
 p {
     margin-bottom: 0px;
    padding-bottom: 5px;
    padding-left: 38px;
    padding-right: 38px;
 }
span {
    float:right;
}
img {
    width: 50%;
}
.card {
  border-radius: 7px;
}

.card-body {
  padding: 0.5rem;
}

.bubble-light {
  background-color: rgb(235, 235, 235);
  border-color: rgb(235, 235, 235);
}

.bubble-dark {
  background-color: rgb(71, 71, 71);
  border-color: rgb(71, 71, 71);
}
</style>
