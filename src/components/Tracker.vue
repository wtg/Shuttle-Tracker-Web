<template>
  <div>
    <div id="map" class="w-100" style="height: 500px;"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Tracker",
  data() {
    return {
      baseURL: 'https://shuttletracker.app',
      mapObj: undefined,
      tokenID: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilg0M0szUjk0VDIifQ.eyJpc3MiOiJTWUJMSDI3N05GIiwiaWF0IjoxNjMwODU3NTYxLCJleHAiOjE2NjIzMzYwMDB9.ksSxblUOJECqgDaBlPU-VZsXG-UGI-W8ty8raDkD_eG2q6cW79-3EoDCHj-wHmynXRmDWR6Yfg72xknMS--ZdA'
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    }
  },
  mounted() {
    // initialize map object
    let vm = this
    mapkit.init({
      authorizationCallback(cb) {
        cb(vm.tokenID)
      }
    })
    // map configs
    this.mapObj = new mapkit.Map("map")
    this.mapObj.showsUserLocation = true
    this.mapObj.showsUserLocationControl = true
    this.mapObj.tintColor = "red"
    this.mapObj.mapType = mapkit.Map.MapTypes.MutedStandard
    this.mapObj.colorScheme = this.isDarkMode ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light
    // center map
    const center = new mapkit.Coordinate(42.73029109316892, -73.67655873298646)
    const span = new mapkit.CoordinateSpan(0.016, 0.016)
    const region = new mapkit.CoordinateRegion(center, span)
    this.mapObj.setRegionAnimated(region)
    // render map structures
    this.renderRoutes()
    this.renderStops()
  },
  methods: {
    getBuses() {
      axios.get(this.baseURL + '/buses')
    },
    async renderRoutes() {
      // fetch api
      const res = await axios.get(this.baseURL + '/routes')
      // extract coordinates
      const coordinates = res.data[0].coordinates.map(coordinate => {
        return new mapkit.Coordinate(coordinate.latitude, coordinate.longitude)
      })
      // render overlay
      const routesOverlay = new mapkit.PolylineOverlay(coordinates, {
        style: new mapkit.Style({
          lineWidth: 2,
          lineJoin: 'round',
          strokeColor: 'steelblue'
        })
      })
      this.mapObj.addOverlay(routesOverlay)
    },
    async renderStops() {
      // fetch api
      const res = await axios.get(this.baseURL + '/stops')

      // define stops
      function factory() {
        const div = document.createElement("div")
        div.className = "annotation-stop"
        return div
      }

      // extract data
      const stops = res.data.map(stop => {
        const coordinate = new mapkit.Coordinate(stop.coordinate.latitude, stop.coordinate.longitude)
        return new mapkit.Annotation(coordinate, factory, {
          title: stop.name
        })
      })
      // render stops
      this.mapObj.addAnnotations(stops)
    }
  },
  watch: {
    isDarkMode(val) {
      this.mapObj.colorScheme = val ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light
    }
  }
}
</script>

<style>
.annotation-stop {
  width: 12px;
  height: 12px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
}
</style>
