import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isDarkMode: false,
        serverStatus: {
            routes: true,
            stops: true,
            buses: true
        },
        fakeHQ: false
    },
    mutations: {
        setDarkMode(state, darkModeOn) {
            state.isDarkMode = darkModeOn
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
        },
        setFakeHQ(state, status) {
            state.fakeHQ = status
        }
    },
    actions: {},
    modules: {}
})
