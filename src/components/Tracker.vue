<template>
  <div>
    <fullscreen v-model="fullscreen">
      <div class="d-flex flex-column h-100">
        <div class="flex-grow-1">

          <!-- Map Component -->
          <div
            id="map"
            class="w-100"
            style="height: 75vh"
            :class="{ 'h-100': fullscreen }"
          ></div>

          <!-- Server Status, Fullscreen Button, and Routes Legend -->
          <div v-if="!fullscreen" id="serverStatus" class="position-absolute">
            <!-- API status -->
              <Status></Status>
            <!-- fullscreen button -->
            <b-badge v-if="showFullScreen && showFSIcon" v-b-tooltip.hover :title="FullscreenDesc" role="button" variant="primary"
                     @click="toggleFullscreen(true)">
              <BIconFullscreen v-if="!fullscreen"></BIconFullscreen>
              <BIconFullscreenExit v-if="fullscreen"></BIconFullscreenExit>
              {{ fullscreen ? "Exit" : "Enter" }} Full-Screen Mode
            </b-badge>
            <b-badge @click="centerMap" v-b-tooltip.hover :title="RecentermapDesc" role="button" variant="primary" class="ml-1"> <BIconVinyl></BIconVinyl> </b-badge>
            <!-- Routes Legend -->
            <div v-if="routes.length > 0">
              <div class="rounded mt-1 d-inline-block" :class="[{'frosted-glass-dark': !isDarkMode}, {'frosted-glass': isDarkMode}]">
                <div v-for="(r, i) in routes" :key="i" class="d-flex align-items-center mx-2 my-1">
                  <span class="mr-1 d-inline-block route-legend-marker" :style="[{'background-color': r.colorName}]"> </span> <span class="text-white">{{r.name}}</span>
                </div>
              </div>
            </div>
            <!-- <div v-if="(currentBuses.length > 0) && trace_history"> -->
            <div v-if="(currentBuses.length > 0) && (trace_history)">
              <div class="rounded mt-1 d-inline-block" :class="[{'frosted-glass-dark': !isDarkMode}, {'frosted-glass': isDarkMode}]">
                <div v-for="(b, i) in currentBuses" :key="i" class="d-flex align-items-center mx-2 my-1">
                  <span class="mr-1 d-inline-block route-legend-marker" :style="[{'background-color': trailColors[i%trailColors.length]}]"> </span> <span class="text-white">{{b}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar (fullscreen mode only) -->
          <div v-if="fullscreen" id="sidebar" class="position-absolute">
            <div v-if="fullscreen && showFSIcon" id="serverStatusFullscreen">
              <img id="logo" src="../../public/logo.png" alt="logo" />
              <Status></Status>
              <b-badge
                v-if="showFullScreen && showFSIcon"
                v-b-tooltip.hover
                :title="FullscreenDesc"
                role="button"
                variant="primary"
                @click="toggleFullscreen(false)"
              >
                <BIconFullscreen v-if="!fullscreen"></BIconFullscreen>
                <BIconFullscreenExit v-if="fullscreen"></BIconFullscreenExit>
                {{ fullscreen ? "Exit" : "Enter" }} Full-Screen Mode
              </b-badge>
            </div>
            <div id="schedule">
              <Schedule v-if="fullscreen"></Schedule>
            </div>
            <div id="qrcode">
              <Fullscrn_qrcode v-if="fullscreen"></Fullscrn_qrcode>
            </div>
          </div>

        </div>

        <!-- Announcement Bar -->
        <Announcement v-if="fullscreen"></Announcement>

      </div>
    </fullscreen>
  </div>
</template>

<script>
import axios from "axios";
import Status from "./Status";
import Announcement from "./Announcement"
import {BIconFullscreen, BIconFullscreenExit, BIconVinyl} from "bootstrap-vue"
import Vue from 'vue'
import VueFullscreen from 'vue-fullscreen'
import mixin from '../mixins/mixins.js'
import Schedule from "./Schedule";
import Fullscrn_qrcode from "./Fullscrn_qrcode";

Vue.use(VueFullscreen);

export default {
  name: "Tracker",
  props: {
    trace_history: Boolean
  },
  components: {
    Status,
    Announcement,
    Fullscrn_qrcode,
    BIconFullscreen,
    BIconFullscreenExit,
    BIconVinyl,
    Schedule
  },
  mixins: [mixin],
  data() {
    return {
      routesInterval: undefined,  // for handling request failures
      stopsInterval: undefined,  // for handling request failures
      mapObj: undefined,
      tokenID: process.env.VUE_APP_MAP_TOKEN_ID,
      apiVersion: process.env.VUE_APP_API_VERSION,
      fullscreen: false,
      FullscreenDesc: 'Toggle fullscreen mode.',
      RecentermapDesc: 'Recenter map.',
      showFullScreen: false,  // only show fs on non-mobile device
      showFSIcon: true,
      fullscreenDelay: 0,
      routes: [], // active route name and color
      currentBuses: [], // active buses
      trailColors: ["orange", "green", "purple", "maroon", "yellow", "pink", "cyan", "gray", "brown", "darkmagenta", "plum", "steelblue", "seashell", "lavender", ] // colors of markers
    }
  },
  computed: {
    baseURL() {
      return this.$store.state.baseURL;
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
  beforeMount() {
    document.addEventListener('fullscreenchange', () => {
      if(!document.fullscreenElement) {
        this.toggleFullscreen(false);
      }
    });
  },
  mounted() {
    // initialize map object
    let vm = this;
    mapkit.init({
      authorizationCallback(cb) {
        cb(vm.tokenID);
      },
    });
    // map configs
    this.mapObj = new mapkit.Map("map");
    this.mapObj.showsUserLocation = true;
    this.mapObj.showsUserLocationControl = true;
    this.mapObj.tintColor = "red";
    this.mapObj.mapType = mapkit.Map.MapTypes.MutedStandard;
    this.mapObj.colorScheme = this.isDarkMode
        ? mapkit.Map.ColorSchemes.Dark
        : mapkit.Map.ColorSchemes.Light;
    // center map
    const center = new mapkit.Coordinate(42.73029109316892, -73.67655873298646);
    const span = new mapkit.CoordinateSpan(0.016, 0.032);
    const region = new mapkit.CoordinateRegion(center, span);
    this.mapObj.setRegionAnimated(region);
    // render map structures
    this.getAPIVersion();
    this.renderRoutes();
    this.renderStops();
    this.updateBuses();
    window.setInterval(this.updateBuses, 5000); // update every 5 seconds
    // check if on mobile
    if (!this.isMobile()) {
      this.showFullScreen = true;
    }
    var f = navigator.userAgent.search("Firefox"); // detect if browser is firefox
    if (f > -1) {
      this.fullscreenDelay = 200; // delay to show icons for firefox users, since firefox has fullscreen animation by default
    }
  },
  methods: {
    centerMap() {
      const center = new mapkit.Coordinate(42.73029109316892, -73.67655873298646);
      const span = new mapkit.CoordinateSpan(0.016, 0.032);
      const region = new mapkit.CoordinateRegion(center, span);
      this.mapObj.setRegionAnimated(region);
    },
    isMobile() {
      // using regex to detect platform, sourced from http://detectmobilebrowsers.com/
      let check = (function (a) {
        return (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
            a.substr(0, 4)
          )
        );
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    },
    toggleFullscreen(status) {
      this.fullscreen = status;
      this.$store.commit('setFsMode', this.fullscreen);
      this.fixRoundedBorders(status);  // remove/apply rounded corners on the map
      this.hideIcons(status);
    },
    fixRoundedBorders(status) {
      const mapDiv = this.$el.querySelector("#map .mk-map-view");
      mapDiv.style.borderRadius = status ? "0" : "7px";
    },
    hideIcons(status) {
      if(!status) return; // don't hide icons when exiting fullscreen.
      var self = this;
      self.$nextTick(function() {
        this.showFSIcon = false;
        this.$store.commit('setIconStatus', false);
        setTimeout(function() {
          self.$nextTick(function() {
            this.showFSIcon = true;
            this.$store.commit('setIconStatus', true);
          });
        }, this.fullscreenDelay);
      });
    },
    async getAPIVersion() {
      try {
        const res = await axios.get(this.baseURL + "/version");
        this.$store.commit("setServerStatus", {
          version: res.data === parseInt(this.apiVersion),
        }); // hardcoded API version
      } catch {
        this.$store.commit("setServerStatus", { version: false });
      }
    },
    async updateBuses() {
      try {
        // fetch api
        const res = await axios.get(this.baseURL + "/buses");
        // create fake HQ traffic
        if (this.fakeHQ) {
          let now = new Date();
          res.data.push({
            id: "69",
            location: {
              coordinate: { latitude: 42.73031, longitude: -73.68521 },
              id: "385FF2A4-EB53-42FE-B754-DAA3DCE04351",
              type: "user",
              date: now.toISOString(),
            },
          });
        }
        // filter and extract data
        let now = Date.now();
        const buses = res.data
          .filter((bus) => {
            return now - Date.parse(bus.location.date) <= 300000; // 5 minutes
          })
          .map((bus) => {
            let color = "gray";
            let busIcon = "🚍";
            switch (bus.location.type) {
              case "user":
                color = "mediumseagreen";
                if (this.isCbMode) {
                  busIcon = "+";
                }
                break;
              case "system":
                color = "red";
                if (this.isCbMode) {
                  busIcon = "!";
                  color = "#7951b3";
                }
                break;
            }
            let timeDelta = Math.ceil(
              (Date.parse(bus.location.date) - now) / 1000
            );
            let unit = "seconds";
            if (timeDelta <= -60) {
              timeDelta = Math.ceil(timeDelta / 60);
              unit = "minutes";
            }
            const formatter = new Intl.RelativeTimeFormat();
            const subtitle = formatter.format(timeDelta, unit);
            const coordinate = new mapkit.Coordinate(
              bus.location.coordinate.latitude,
              bus.location.coordinate.longitude
            );
            return new mapkit.MarkerAnnotation(coordinate, {
              title: `Bus ${bus.id}`,
              subtitle: subtitle,
              color: color,
              glyphText: busIcon,
            });
          });
        // filter and render buses
        const existingBusAnnotations = this.mapObj.annotations.filter(
          (annotation) => {
            return annotation.title.indexOf("Bus") === 0;
          }
        );
        // remove old markers
        this.mapObj.removeAnnotations(existingBusAnnotations); // remove existing markers
        this.mapObj.addAnnotations(buses);
        buses.forEach((bus) => {
          if (!this.currentBuses.includes(bus.title)) {
            this.currentBuses.push(bus.title);
          }
        })
        // retain historical bus location
        if (this.trace_history) {
          const factory = function (coord, options) {
            const div = document.createElement("div");
            div.className = "trace-marker";
            div.title = options.title;
            div.style.backgroundColor = options.color
            div.style.borderColor = options.color
            return div;
          }
          const traces = buses.map((bus) => {
            return new mapkit.Annotation(bus.coordinate, factory, { // creating marker for each unique bus
              title: "Marker " + bus.title,
              color: this.trailColors[this.currentBuses.indexOf(bus.title) % this.trailColors.length], // assigns each bus with a color
            })
          })
          this.mapObj.addAnnotations(traces);
        }
        // set server status
        this.$store.commit("setServerStatus", { buses: true });
      } catch {
        // fetch api failed, update server status
        this.$store.commit("setServerStatus", { buses: false });
      }
    },
    async renderRoutes() {
      try {
        // fetch api
        const res = await axios.get(this.baseURL + "/routes");

        // Routes
        this.routes = [];
        res.data.forEach((routes) => {
          // update active routes
          this.routes.push({
            name: routes.name,
            colorName: routes.colorName
          })
          // extract coordinates
          const coordinates = routes.coordinates.map((coordinate) => {
            return new mapkit.Coordinate(
                coordinate.latitude,
                coordinate.longitude
            );
          });
          // render overlay
          const routesOverlay = new mapkit.PolylineOverlay(coordinates, {
            style: new mapkit.Style({
              lineWidth: 2,
              lineJoin: "round",
              strokeColor: routes.colorName,
            }),
          });
          this.mapObj.addOverlay(routesOverlay);
          this.$store.commit("setServerStatus", { routes: true });
        })

      } catch {
        // fetch api failed, update server status
        this.$store.commit("setServerStatus", { routes: false });
      }
    },
    async renderStops() {
      // define stops
      function factory(coord, options) {
        const div = document.createElement("div");
        div.className = "annotation-stop";
        div.title = options.title;
        return div;
      }

      const popoverFactory = {
        // creating popover element
        calloutElementForAnnotation: function (annotations) {
          let element = document.createElement("div");
          element.classList.add("annotation-popover");
          element.classList.add("p-2");
          element.classList.add("rounded");
          element.classList.add("shadow");
          element.textContent = annotations.title;
          return element;
        },
      };

      try {
        // fetch api
        const res = await axios.get(this.baseURL + "/stops");
        // extract data
        const stops = res.data.map((stop) => {
          const coordinate = new mapkit.Coordinate(
            stop.coordinate.latitude,
            stop.coordinate.longitude
          );
          return new mapkit.Annotation(coordinate, factory, {
            callout: popoverFactory,
            title: stop.name,
            calloutOffset: new DOMPoint(0, 10),
          });
        });
        // render stops
        this.mapObj.addAnnotations(stops);
        this.$store.commit("setServerStatus", { stops: true });
      } catch {
        // fetch api failed, update server status
        this.$store.commit("setServerStatus", { stops: false });
      }
    },
  },
  watch: {
    isDarkMode(val) {
      this.mapObj.colorScheme = val
        ? mapkit.Map.ColorSchemes.Dark
        : mapkit.Map.ColorSchemes.Light;
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
        clearInterval(this.routesInterval);
      }
      if (val.stops && this.stopsInterval) {
        clearInterval(this.stopsInterval);
      }
    },
    baseURL() {
      // refresh if un-official API is used
      // remove overlays
      this.mapObj.overlays.forEach((overlay) => {
        this.mapObj.removeOverlay(overlay)
      })
      // re-render all map structures
      this.getAPIVersion();
      this.renderRoutes();
      this.renderStops();
      this.updateBuses();
    }
  }
};
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

.annotation-popover-light {
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(5px);
}

.annotation-popover {
  max-width: 140px;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
}

.annotation-popover:before {
  position: absolute;
  content: "";
  right: calc(50% - 10px);
  bottom: -10px;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: rgba(255, 255, 255, 0.25) transparent transparent transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}

.trace-marker {
  width: 8px;
  height: 8px;
  border: 2px solid;
  border-radius: 50%;
  opacity: 0.8;
}

.frosted-glass {
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(5px);
}

.frosted-glass-dark {
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
}

.route-legend-marker {
  height: .8em;
  width: .8em;
  border-radius: 50%;
}

#map > .mk-map-view {
  border-radius: 7px;
}

#serverStatus {
  top: 6px;
  left: 24px;
}

#serverStatusFullscreen {
  margin-top: 10px;
}

#sidebar {
  height: 100%;
  width: 265px;
  padding-left: 15px;
  padding-right: 24px;
  top: 0px;
  left: 0px;
  background-color: rgba(104, 104, 104, 0.425);
}

#schedule {
  margin-top: 60px;
}

#logo {
  width: 25%;
  float: right;
}
</style>
