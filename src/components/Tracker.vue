<template>
  <div>
    <div id="map" class="w-100 rounded" style="height: 75vh"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Tracker",
  data() {
    return {
      routesInterval: undefined,  // for handling request failures
      stopsInterval: undefined,  // for handling request failures
      baseURL: 'https://shuttletracker.app',
      mapObj: undefined,
      tokenID: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilg0M0szUjk0VDIifQ.eyJpc3MiOiJTWUJMSDI3N05GIiwiaWF0IjoxNjMwODU3NTYxLCJleHAiOjE2NjIzMzYwMDB9.ksSxblUOJECqgDaBlPU-VZsXG-UGI-W8ty8raDkD_eG2q6cW79-3EoDCHj-wHmynXRmDWR6Yfg72xknMS--ZdA'
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.state.isDarkMode;
    },
    serverStatus() {
      return this.$store.state.serverStatus;
    },
    isCbMode() {
      return this.$store.state.isCbMode;
    },
    fakeHQ() {
      return this.$store.state.fakeHQ;
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
    const span = new mapkit.CoordinateSpan(0.016, 0.032)
    const region = new mapkit.CoordinateRegion(center, span)
    this.mapObj.setRegionAnimated(region)
    // render map structures
    this.renderRoutes()
    this.renderStops()
    this.updateBuses()
    window.setInterval(this.updateBuses, 5000)  // update every 5 seconds
  },
  methods: {
    async updateBuses() {
      try {
        // fetch api
        const res = await axios.get(this.baseURL + '/buses')
        // create fake HQ traffic
        if (this.fakeHQ) {
          let now = new Date()
          res.data.push({
            "id": '( ͡° ͜ʖ ͡°)',
            "location":
                {
                  "coordinate": {"latitude":42.730310,"longitude":-73.685210},
                  "id":"385FF2A4-EB53-42FE-B754-DAA3DCE04351",
                  "type":"user",
                  "date": now.toISOString()
                }
          })
        }
        // filter and extract data
        let now = Date.now()
        const buses = res.data
            .filter(bus => {
              return now - Date.parse(bus.location.date) <= 300000 // 5 minutes
            })
            .map(bus => {
              let color = "gray"
              let busIcon = "🚍"
              switch (bus.location.type) {
                case "user":
                  if (this.isCbMode) {
                    busIcon = "H"
                  }
                  color = "mediumseagreen"
                  break;
                case "system":
                  color = "red"
                  if (this.isCbMode) {
                    busIcon = "L"
                  }
                  break;
              }
              let timeDelta = Math.ceil((Date.parse(bus.location.date) - now) / 1000)
              let unit = "seconds"
              if (timeDelta <= -60) {
                timeDelta = Math.ceil(timeDelta / 60)
                unit = "minutes"
              }
              const formatter = new Intl.RelativeTimeFormat()
              const subtitle = formatter.format(timeDelta, unit)
              const coordinate = new mapkit.Coordinate(bus.location.coordinate.latitude, bus.location.coordinate.longitude)
              return new mapkit.MarkerAnnotation(coordinate, {
                title: `Bus ${bus.id}`,
                subtitle: subtitle,
                color: color,
                glyphText: busIcon
              })
            })
        // filter and render buses
        const existingBusAnnotations = this.mapObj.annotations.filter(annotation => {
          return annotation.title.indexOf("Bus") == 0
        })
        this.mapObj.removeAnnotations(existingBusAnnotations) // remove existing markers
        buses.forEach(bus => {
          this.mapObj.addAnnotation(bus)  // add updated markers
        })
        this.$store.commit('setServerStatus', {buses: true})
      } catch {
        // fetch api failed, update server status
        this.$store.commit('setServerStatus', {buses: false})
      }
    },
    async renderRoutes() {
      try {
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
        this.$store.commit('setServerStatus', {routes: true})
      } catch {
        // fetch api failed, update server status
        this.$store.commit('setServerStatus', {routes: false})
      }
    },
    async renderStops() {
      // define stops
      function factory() {
        const div = document.createElement("div")
        div.className = "annotation-stop"
        return div
      }
      try {
        // fetch api
        const res = await axios.get(this.baseURL + '/stops')
        // extract data
        const stops = res.data.map(stop => {
          const coordinate = new mapkit.Coordinate(stop.coordinate.latitude, stop.coordinate.longitude)
          return new mapkit.Annotation(coordinate, factory, {
            title: stop.name
          })
        })
        // render stops
        this.mapObj.addAnnotations(stops)
        this.$store.commit('setServerStatus', {stops: true})
      } catch {
        // fetch api failed, update server status
        this.$store.commit('setServerStatus', {stops: false})
      }
    }
  },
  watch: {
    isDarkMode(val) {
      this.mapObj.colorScheme = val ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light
    },
    serverStatus(val) {
      // retry failed api every 5 seconds
      if (!val.routes) {
        this.routesInterval = setInterval(this.renderRoutes, 5000);
      }
      if (!val.stops) {
        this.stopsInterval = setInterval(this.renderStops, 5000);
      }
      // clear retry interval
      if (val.routes && this.routesInterval) {
        clearInterval(this.routesInterval)
      }
      if (val.stops && this.stopsInterval) {
        clearInterval(this.stopsInterval)
      }
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
  opacity: 0.8;
}
#map > .mk-map-view {
  border-radius: inherit;
}
</style>
