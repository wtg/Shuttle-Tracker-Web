<template>
  <div id="app">
    <link rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossorigin="anonymous">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    checkDarkMode() {
      // check for browser color mode, default is light mode
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode enabled
        this.$store.commit('setDarkMode', true)
      }
      // detect mode change
      window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', event => {
            if (event.matches) { // dark mode
              this.$store.commit('setDarkMode', true)
            } else { // light mode
              this.$store.commit('setDarkMode', false)
            }
          })
    }
  },
  created() {
    this.checkDarkMode()
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

</style>
