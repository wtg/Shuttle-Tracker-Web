<template>
  <div id="app" :class="[{'bg-dark-theme': isDarkMode}]">
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
        document.body.classList.add('bg-dark-theme')
      }
      // detect mode change
      window.matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', event => {
            if (event.matches) {
              // dark mode
              this.$store.commit('setDarkMode', true)
              document.body.classList.add('bg-dark-theme')
            } else {
              // light mode
              this.$store.commit('setDarkMode', false)
              document.body.classList.remove('bg-dark-theme')
            }
          })
    }
  },
  mounted() {
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
.bg-dark-theme {
  background-color: #101214;
}
</style>
