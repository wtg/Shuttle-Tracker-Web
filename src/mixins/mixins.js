export default {
  computed: {
    /**
     * Checks if in dark mode
     * @return{boolean} The dark mode status
     */
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
    /**
     * Checks if in fullscreen mode
     * @return{boolean} The fullscreen status
     */
    isFsMode() {
      return !this.$store.state.isFsMode
    }
  }  
}