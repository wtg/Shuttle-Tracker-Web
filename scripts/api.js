export default class API {
	
	constructor() { }
	
	static baseURL = new URL("https://shuttletracker.app")
	
	async readBuses() {
		const url = new URL("/buses", API.baseURL)
		const request = new Request(url, {
			method: "GET"
		})
		const response = await fetch(request)
		const buses = await response.json()
		return buses
			.filter(bus => {
				return Date.now() - Date.parse(bus.location.date) <= 300000
			})
			.map(bus => {
				let color = "gray"
				switch (bus.location.type) {
				case "user":
					color = "springgreen"
					break;
				case "system":
					color = "red"
					break;
				}
				let timeDelta = Math.ceil((Date.parse(bus.location.date) - Date.now()) / 1000)
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
					glyphText: "🚍"
				})
			})
	}
	
	async readRoutes() {
		const url = new URL("/routes", API.baseURL)
		const request = new Request(url, {
			method: "GET"
		})
		const response = await fetch(request)
		const routes = await response.json()
		const route = routes[0]
		const coordinates = route.coordinates.map(coordinate => {
			return new mapkit.Coordinate(coordinate.latitude, coordinate.longitude)
		})
		const style = new mapkit.Style({
			lineWidth: 2,
			lineJoin: "round",
			strokeColor: "steelblue"
		})
		return new mapkit.PolylineOverlay(coordinates, {
			style: style
		})
	}
	
	async readStops() {
		
		function factory(coordinate, options) {
			const div = document.createElement("div")
			div.className = "annotation-stop"
			return div
		}
		
		const url = new URL("/stops", API.baseURL)
		const request = new Request(url, {
			method: "GET"
		})
		const response = await fetch(request)
		const stops = await response.json()
		return stops.map(stop => {
			const coordinate = new mapkit.Coordinate(stop.coordinate.latitude, stop.coordinate.longitude)
			return new mapkit.Annotation(coordinate, factory, {
				title: stop.name
			})
		})
	}
	
}