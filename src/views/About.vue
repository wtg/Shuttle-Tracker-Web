<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <Header></Header>
        </div>
      </div>
      <div>
        <div class="row">
          <div class="col" :class="{'text-white': isDarkMode}" style="max-width: 1140px; ">
            <h2>About</h2>
            <p> 
              Hello
            </p>
            <b-button to="/" style="margin-top: 3%;"> Home Page </b-button>
          </div>
        </div>
        <div class="col mt-4" :class="{'text-white': isDarkMode}" style="margin-top: 5%;">
      <Copyright></Copyright>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import mixin from "../mixins/mixins";

export default {
  name: "About",
  mixins: [mixin],
  components: {
    Header
  }
}
</script>

<style scoped>

</style>