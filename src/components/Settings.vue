<template>
  <div>
    <h3 :class="{'text-white': isDarkMode}">Settings</h3>
    <b-form-checkbox @change="setCbMode" :class="[{'text-white': isDarkMode}]" v-model="isCbMode" name="cbModeSwitch"
                     v-b-tooltip.hover.lefttop :title="cbExplanation" switch>
      Colorblind Mode
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      isCbMode: false,
      cbExplanation: "Changes the icons of buses to H and L based on the quality of the bus data",
    }
  },
  methods: {
    setCbMode() {
      this.$store.commit('setCbMode', this.isCbMode)
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
  created() {
    this.isCbMode = this.$store.state.isCbMode  // sync state
  }
}
</script>

<style scoped>
</style>
