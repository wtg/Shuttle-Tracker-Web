import API from "./api.js"

async function updateBuses() {
	console.log("yay")
	const busAnnotations = await document.api.readBuses()
	const existingBusAnnotations = map.annotations.filter(annotation => {
		return annotation.title.indexOf("Bus") == 0
	})
	map.removeAnnotations(existingBusAnnotations)
	busAnnotations.forEach(busAnnotation => {
		map.addAnnotation(busAnnotation)
	})
}

export async function initializeMap(prefersDarkMode) {
	const tokenID = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilg0M0szUjk0VDIifQ.eyJpc3MiOiJTWUJMSDI3N05GIiwiaWF0IjoxNjMwODU3NTYxLCJleHAiOjE2NjIzMzYwMDB9.ksSxblUOJECqgDaBlPU-VZsXG-UGI-W8ty8raDkD_eG2q6cW79-3EoDCHj-wHmynXRmDWR6Yfg72xknMS--ZdA"
	mapkit.init({
		authorizationCallback: function(done) {
			done(tokenID)
		}
	})
	const center = new mapkit.Coordinate(42.73029109316892, -73.67655873298646)
	const span = new mapkit.CoordinateSpan(0.016, 0.016)
	const region = new mapkit.CoordinateRegion(center, span)
	const map = new mapkit.Map("map")
	map.showsUserLocation = true
	map.showsUserLocationControl = true
	map.tintColor = "red"
	map.mapType = mapkit.Map.MapTypes.MutedStandard
	map.colorScheme = prefersDarkMode ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light
	map.setRegionAnimated(region)
	const routeOverlay = await document.api.readRoutes()
	map.addOverlay(routeOverlay)
	const stopAnnotations = await document.api.readStops()
	stopAnnotations.forEach(stopAnnotation => {
		map.addAnnotation(stopAnnotation)
	})
	window.setInterval(updateBuses, 5000)
	await updateBuses()
}