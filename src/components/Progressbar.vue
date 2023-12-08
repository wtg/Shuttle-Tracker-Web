<template>
    <div>
      <b-progress :max=max>
          <b-progress-bar :value=value>
            <span>🚍 <strong>{{ value }} / {{ max }}</strong></span>
          </b-progress-bar>
      </b-progress>
    </div>
  </template>
  
  <script>
    export default {
      name: "Progressbar",
      data() {
        return {
            value: 100, // hard coded progres bar value
            max: 100   // hard coded progress bar max value
        }
      },
      computed: {
        isDarkMode() {
            return this.$store.state.isDarkMode
        },
      }
    }
  </script>
  
  <style scoped>
    .progress {
      margin-top: 5px;
      margin-left: 5px;
      margin-right: 5px;
    }
  </style>