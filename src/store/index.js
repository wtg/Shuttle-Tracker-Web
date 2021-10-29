import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // Default State of the website
    state: {
        isDarkMode: false,
        isCbMode: false,
        serverStatus: {
            routes: true,
            stops: true,
            buses: true,
            version: true
        },
        fakeHQ: false
    },
    // Functions to alter the website states
    mutations: {
        // Set darkmode with second parameter (true/false)
        setDarkMode(state, darkModeOn) {
            state.isDarkMode = darkModeOn
            if (darkModeOn) {
              document.body.style.backgroundColor = "#1D1D1D"
            }
            else {
              document.body.style.backgroundColor = "#FFFFFF"
            }
        },
        // Set the status bar on top left of the map
        setServerStatus(state, status) {
            if (status.routes !== undefined) {
                state.serverStatus.routes = status.routes
            }
            if (status.stops !== undefined) {
                state.serverStatus.stops = status.stops
            }
            if (status.buses !== undefined) {
                state.serverStatus.buses = status.buses
            }
            if (status.version !== undefined) {
                state.serverStatus.version = status.version
            }
        },
        // Set Colorblind mode with second parameter (true/false)
        setCbMode(state, status) {
            state.isCbMode = status
        },
        // Set a fake bus for development purposes
        setFakeHQ(state, status) {
            state.fakeHQ = status
        }
    },
    actions: {},
    modules: {}
})
