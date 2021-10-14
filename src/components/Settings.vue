<template>
  <div>
    <h3 :class="{'text-white': isDarkMode}">Settings</h3>
    <b-form-checkbox @change="setCbMode" :class="[{'text-white': isDarkMode}]" v-model="isCbMode" name="cbModeSwitch"
                     v-b-tooltip.hover.lefttop :title="cbExplanation" switch>
      Colorblind Mode
    </b-form-checkbox>
    <b-form-checkbox @change="setDarkMode" :class="[{'text-white': isDarkMode}]" v-model="isDark" name="DarkModeSwitch"
                     v-b-tooltip.hover.lefttop :title="darkExplanation" switch>
      Dark Mode
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      isCbMode: false,
      isDark: false,
      cbExplanation: "Changes the icons of buses to H and L based on the quality of the bus data",
      darkExplanation: "Switches dark mode on or off",
    }
  },
  methods: {
    setCbMode() {
      this.$store.commit('setCbMode', this.isCbMode)
    },
    setDarkMode() {
      this.$store.commit('setDarkMode', this.isDark)
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  },
  created() {
    this.isCbMode = this.$store.state.isCbMode  // sync state
    this.isDark = this.$store.state.isDarkMode
  }
}
</script>

<style scoped>
</style>
