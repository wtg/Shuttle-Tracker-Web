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
          <div class="col">
            <h2 class="text-white">Error 404</h2>
            <p class="text-white">
                Page Not Found
            </p>
            <b-button to="/"> Home Page </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";

export default {
  name: "PageNotFound",
  components: {
    Header
  }
}
</script>

<style scoped>

</style>