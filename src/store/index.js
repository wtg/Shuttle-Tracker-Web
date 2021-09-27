import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isDarkMode: false
    },
    mutations: {
        setDarkMode(state, darkModeOn) {
            state.isDarkMode = darkModeOn
        }
    },
    actions: {},
    modules: {}
})
