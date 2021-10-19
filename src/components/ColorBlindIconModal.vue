<template>
  <b-modal
    title="Welcome to the new Shuttle Tracker!"
    :header-text-variant="themeText"
    :footer-bg-variant="themeBg"
    :header-bg-variant="themeBg"
    :body-bg-variant="themeBg"
    ref="colorBlindIconsModal"
    ok-only
    ok-title="Continue"
  >
    <head>
      <link rel="stylesheet' href='css/bootstrap.min.css" />
    </head>
    <div :class="[{ 'text-white': isDarkMode }, { 'bg-dark': isDarkMode }]">
      <div>
        <p>
          <b-icon-plus-circle-fill
            class="mr-3 icon-round"
            font-scale="1.5"
            variant="success"
          ></b-icon-plus-circle-fill>
          Indicates high-quality location data
        </p>
        <p>
          <b-icon-exclamation-circle-fill
            class="mr-3 icon-round"
            style="color: #7951b3"
          ></b-icon-exclamation-circle-fill>
          Indicates low-quality location data.
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { BIconPlusCircleFill, BIconExclamationCircleFill } from "bootstrap-vue";
export default {
  name: "Modal",
  components: {
    BIconPlusCircleFill,
    BIconExclamationCircleFill,
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
    isColorBlind() {
      return this.$store.state.isCBMode;
    },
    themeBg() {
      return this.isDarkMode ? "dark" : "light";
    },
    themeText() {
      return this.isDarkMode ? "light" : "dark";
    },
  },
  watch: {
    isColorBlind(val) {
    //  console.log("hello")
      if(val){
        showModal()
      }
    }
  },
  mounted() {
    console.log("hello")
    console.log(this.isColorBlind)
    if(this.isColorBlind&&!this.$cookies.isKey("shownColorBlindIconModal")) {
      this.$cookies.set("shownColorBlindIconModal", true); // true if shown already
      this.showModal();

    }
  },
  methods: {
    showModal() {
      this.$refs["colorBlindIconsModal"].show();
    },
  },
};
</script>

<style scoped>
.icon-round {
  width: 40px !important;
  height: 40px !important;
}
</style>