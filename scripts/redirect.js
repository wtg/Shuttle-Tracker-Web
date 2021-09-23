const parser = new UAParser()
const result = parser.getResult()
const versionComponents = result.os.version.split(".")
if (result.os.name == "iOS" && parseInt(versionComponents[0]) < 15) {
	window.location.replace("https://shuttletracker.app/testflight")
}