import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
    mutations: {
        setDarkMode(state, darkModeOn) {
            state.isDarkMode = darkModeOn
            if (darkModeOn) {
              document.body.style.backgroundColor = "#1D1D1D"
            }
            else {
              document.body.style.backgroundColor = "#FFFFFF"
            }
        },
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
        setCbMode(state, status) {
            state.isCbMode = status
        },
        setFakeHQ(state, status) {
            state.fakeHQ = status
        }
    },
    actions: {},
    modules: {}
})
