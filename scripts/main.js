import * as asyncWrapper from "./async.js"
import API from "./api.js"
import Cookies from "./dist/js.cookie.min.mjs"

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
const bootstrapDarkmode = window['bootstrap-darkmode']
const themeConfig = new bootstrapDarkmode.ThemeConfig()
themeConfig.loadTheme = () => {
	return prefersDarkMode ? "dark" : "light"
};
themeConfig.initTheme()

// const osesWithApp = ["Android", "Android-x86", "Chromium OS", "iOS", "Mac OS"]
const osesWithApp = ["iOS", "Mac OS"]
const parser = new UAParser()
const result = parser.getResult()
const appAlertClosed = Cookies.get("app-alert-closed") ?? false
if (osesWithApp.includes(result.os.name) && !appAlertClosed) {
	const appAlertElement = document.getElementById("alert-app")
	appAlertElement.addEventListener("close.bs.alert", () => {
		Cookies.set("app-alert-closed", true, {
			expires: 365
		})
	})
	appAlertElement.classList.remove("invisible")
}

const welcomeModalElement = document.getElementById("modal-welcome")
welcomeModalElement.addEventListener("hide.bs.modal", () => {
	Cookies.set("welcome-modal-shown", true, {
		expires: 365
	})
})
const welcomeModalShown = Cookies.get("welcome-modal-shown") ?? false
if (!welcomeModalShown) {
	const welcomeModal = new bootstrap.Modal(welcomeModalElement)
	welcomeModal.show()
}

document.api = new API()
await asyncWrapper.initializeMap(prefersDarkMode)