import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import { v4 as uuid } from 'uuid';

Vue.use(Vuex)

export default new Vuex.Store({
    // Default State of the website
    state: {
        isDarkMode: false,
        isCbMode: false,
        isFsMode: false,
        showIcons: true,
        serverStatus: {
            routes: true,
            stops: true,
            buses: true,
            schedule: true,
            version: true
        },
        fakeHQ: false,
        fakeAnnounce: false,
        defaultURL: process.env.VUE_APP_API_BASE_URL,   // keeps track of the default URL, immutable in run time
        baseURL: process.env.VUE_APP_API_BASE_URL,  // the baseURL that the API calls follows, mutable
        isOfficialURL: true, // indicates is the API is the official one or not
        isAdvMode: false,    // indicates whether advance settings are enabled
        isAnnouncementClicked: false, // indicates whether announcement bar is clicked
        allAnnouncements: [],
        progressBar: false,
        devMode: false,
        logBuffer: [],
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
            if (status.schedule !== undefined) {
                state.serverStatus.schedule = status.schedule
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
        },
        // Show a fake announcement bar for development purposes
        fakeAnnouncement(state, status) {
            state.fakeAnnounce = status;
        },
        // Set fullscreen mode
        setFsMode(state, status) {
            state.isFsMode = status;
        },
        setIconStatus(state, status) {
            state.showIcons = status;
        },
        // Set baseURL for the APIs
        setBaseURL(state, newURL) {
            state.baseURL = newURL
            state.isOfficialURL = false
        },
        // Set baseURL back to default
        restoreBaseURL(state) {
            state.baseURL = this.state.defaultURL
            state.isOfficialURL = true
        },
        // Enable / Disable advance setting tab
        setAdvMode(state, status){
            state.isAdvMode = status
        },
        // Set announcement clicked
        setAnnouncementClicked(state, status) {
            state.isAnnouncementClicked = status;
        },
        // Enable / Disable ProgressBar
        setProgressBar(state, status) {
            state.progressBar = status;
        },
        setDevMode(state, status) {
            state.devMode = status;
        },
        // Set all announcement.
        setAllAnnouncements(state, status) {
            if (status == 'clear') {
                state.allAnnouncements = [];
            } else if (Array.isArray(status)) {
                state.allAnnouncements = status;
            } else {
                state.allAnnouncements.push(status);
            }
        },
        // Push data into the log buffer.
        pushLog(state, data) {
            state.logBuffer.push(data);
        },
        // Upload the log buffer, clearing it afterward.
        async uploadLogs(state) {
            // Check if there are any logs to upload.
            if (state.logBuffer.length == 0) {
                return;
            }
            // Create the request.
            let request = {
                "id": uuid(),
                "content": state.logBuffer,
                "clientPlatform": "web",
                "date": new Date().toUTCString(),
            };
            // Submit a POST request to `/logs` endpoint.
            await axios.post('/logs', request)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                })
        }
    },
    actions: {},
    modules: {}
})
